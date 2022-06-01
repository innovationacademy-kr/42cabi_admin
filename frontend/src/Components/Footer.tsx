import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyles>
      <div className="Container">
        <a
          className="textLink"
          target="_blank"
          href="https://42born2code.slack.com/app_redirect?channel=U02LZQFGS1E"
          rel="noreferrer"
        >
          jaesjeon&nbsp;|
        </a>
        <a
          className="textLink"
          target="_blank"
          href="https://42born2code.slack.com/app_redirect?channel=U02L3CFRYPQ"
          rel="noreferrer"
        >
          &nbsp;yubchoi&nbsp;|
        </a>
        <a
          className="textLink"
          target="_blank"
          href="https://42born2code.slack.com/app_redirect?channel=U020PTXTWCU"
          rel="noreferrer"
        >
          &nbsp;yoyoo&nbsp;|
        </a>
        <a
          className="textLink"
          target="_blank"
          href="https://42born2code.slack.com/app_redirect?channel=U01H7F1RP0A"
          rel="noreferrer"
        >
          &nbsp;jiwchoi&nbsp;|
        </a>
        <a
          className="textLink"
          target="_blank"
          href="https://github.com/innovationacademy-kr/42cabi_admin"
          rel="noreferrer"
        >
          &nbsp;Github&nbsp;
        </a>
        <div>© 2022 42Cabi</div>
      </div>
    </FooterStyles>
  );
};

const FooterStyles = styled.footer`
  height: 10px;
  bottom: 0px;
  left: 0;
  right: 0;
  margin: 0;
  position: fixed;
  text-align: center;

  .Container {
    width: 100%;
    bottom: 0;

    font-size: x-small;
    position: absolute;
    color: gray;
    a {
      color: gray;
      text-decoration: none;
    }
  }
`;

export default Footer;
