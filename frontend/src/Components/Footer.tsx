import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyles>
      <div className="Container">
        <a
          className="textLink"
          target="_blank"
          href="https://github.com/innovationacademy-kr/42cabi_admin/issues/new?assignees=&labels=&template=bug_report.md&title="
          rel="noreferrer"
        >
          Report&nbsp;|
        </a>
        <a
          className="textLink"
          target="_blank"
          href="https://github.com/innovationacademy-kr/42cabi_admin"
          rel="noreferrer"
        >
          &nbsp;Github&nbsp;
        </a>
        <a
          className="textLink"
          target="_blank"
          href="https://www.notion.so/hyunja/42cabi-5fc66d1a6b0a4c48862b2e66e7cf1397"
          rel="noreferrer"
        >
          |&nbsp;Notion
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
