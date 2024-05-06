// global Product
import React, { PureComponent } from "react";
// import { getCookie } from "../../lib/cookie";
// import "./EngageFeedbackWidget.css";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const Product = window.Product;

const defaultPlaceholder = "E.g. I need a feature to help...";

export default class EngageFeedbackWidget extends PureComponent {
  state = {
    apiErrorMessage: null,
    showErrorMessage: false,
    showSuccessMessage: false,
    isSending: false,
    type: "question",
    messagePlaceholder: defaultPlaceholder,
    fromEmail: null,
    message: "",
  };

  componentDidMount() {
    if (window.fca) {
      fca.trackFeatureUsage("FeedbackMenu");
    }
    this.setState({
      fromEmail: this.props.fromEmail,
    });
  }

  handleChangeMessage = (e) => {
    this.setState({ message: e.target.value });
  };

  handleChangeEmail = (e) => {
    this.setState({ fromEmail: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { apiKey } = this.props;
    const { type, message, fromEmail } = this.state;
    this.setState({ isSending: true });
    const url =
      window.location != window.parent.location
        ? document.referrer
        : document.location.href;
    const response = await fetch("/api/widget/", {
      method: "POST",
      body: JSON.stringify({
        type,
        api_key: apiKey,
        message,
        from_email: fromEmail,
        url,
      }),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    });
    const result = await response.json();
    this.setState({ isSending: false });
    if (result.success) {
      window.top.postMessage(
        {
          name: "engage-submit-success",
          apiKey,
        },
        "*"
      );
      if (window.fca) {
        fca.trackEvent("FeedbackSubmitted", type);
      }
      this.setState({ message: "", fromEmail: "", showSuccessMessage: true });
      setTimeout(() => {
        this.setState({ showSuccessMessage: false });
      }, 10000);
      // send window event to close.
    }

    if (result.error) {
      this.setState({
        showErrorMessage: true,
        apiErrorMessage: result.message,
      });
      setTimeout(() => {
        this.setState({ showErrorMessage: false });
      }, 10000);
    }
  };

  handleChangeType(type) {
    this.setState({ type });
  }

  renderLoading() {
    return (
      <div className="loading-container">
        <div
          className="loading-spinner spinner-border spinner-border-sm me-2 text-muted"
          role="status"
        ></div>
        <span className="text-muted">Loading...</span>
        <style jsx>{`
          .loading-container {
            display: flex;
            min-height: 80vh;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }

  render() {
    const { contactEmail, primaryColor, secondaryColor, showPoweredBy } =
      this.props;

    const initialFromEmail = this.props.fromEmail;
    const { fromEmail, messagePlaceholder } = this.state;
    if (this.state.loading) {
      return this.renderLoading();
    }

    return (
      <div>
        <form
          className="d-block js-engage--close"
          method="post"
          tabIndex="-1"
          onSubmit={this.handleSubmit}
        >
          <div className="">
            <div className="module-content">
              <div className="module-body">
                <div className="module-form-group">
                  <textarea
                    className="engage--message"
                    required
                    name="message"
                    autoFocus={true}
                    onChange={this.handleChangeMessage}
                    value={this.state.message}
                    placeholder={messagePlaceholder}
                    rows="5"
                  ></textarea>
                </div>

                {!initialFromEmail && (
                  <div className="module-form-group">
                    <label htmlFor="engage--email">Your email</label>
                    <input
                      type="email"
                      value={fromEmail}
                      placeholder="E.g. joe@example.com"
                      required
                      id="engage--email"
                      onChange={this.handleChangeEmail}
                      className="module-form-control"
                    />
                  </div>
                )}

                {this.state.showSuccessMessage && (
                  <div className="alert alert-success mt-3">
                    Your {this.state.type} has been sent. Thank you!
                  </div>
                )}
                {this.state.showErrorMessage && (
                  <div className="alert alert-danger mt-3">
                    {this.state.apiErrorMessage}
                  </div>
                )}
              </div>

              <div className="module-footer d-flex justify-content-between">
                <div className="footer-actions d-flex justify-content-between">
                  <div>
                    <button type="submit" className="submodule-submit">
                      {this.state.isSending ? "Sending..." : "Send"}
                    </button>
                  </div>
                </div>
                {Boolean(Number(showPoweredBy)) && (
                  <div className="powered-by">
                    <a
                      href="https://www.useproduct.com/?s=feedback"
                      target="_blank"
                    >
                      Powered by UseProduct
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>

        <style jsx>{`
          a {
            color: ${primaryColor};
          }

          a:hover,
          a:focus-within {
            text-decoration: underline;
          }

          .engage--message {
            width: 100%;
            border: 1px solid #eee;
            border-radius: 5px;
            padding: 0.5rem;
            font-size: 1rem;
            box-sizing: border-box;
            font-family: "Inter Var", -apple-system, BlinkMacSystemFont,
              San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif;
          }

          .module-form-group {
            margin-bottom: 1rem;
          }

          .module-form-group label {
            margin-bottom: 0.25rem;
            display: block;
          }

          .module-form-control {
            display: block;
            padding: 0.5rem;
            width: 100%;
            box-sizing: border-box;
            font-size: 1rem;
            border: 1px solid #eee;
            border-radius: 5px;
            font-family: "Inter Var", -apple-system, BlinkMacSystemFont,
              San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif;
          }

          .btn-primary {
            background-color: ${primaryColor};
            border-color: transparent;
            transition: filter 180ms ease-in-out;
          }

          .btn-primary:hover {
            filter: brightness(120%);
          }

          .nav-link {
            color: ${secondaryColor};
            padding: 0.3rem 0.75rem;
          }

          .nav-link.active {
            background-color: ${secondaryColor};
          }

          .submodule-submit {
            display: block;
            width: 100%;
            color: #fff;
            background: #333;
            border-radius: 5px;
            font-size: 1rem;
          }

          .powered-by a {
            text-decoration: none;
            color: #6c757d;
            font-size: 0.8rem;
          }

          .powered-by a:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    );
  }
}
