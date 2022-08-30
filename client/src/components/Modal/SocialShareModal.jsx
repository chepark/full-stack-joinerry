import { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const SocialShareModal = ({ shareUrl, title, summary }) => {
  const [copied, setCopied] = useState(false);
  const POPUP_SIZE = "width=500,height=600";

  const shareOnFacebook = () => {
    const sendUrl = process.env.REACT_REACT_APP_SERVER_BASE_URL + shareUrl;

    window.open(
      "http://www.facebook.com/sharer/sharer.php?u=" + sendUrl,
      "",
      POPUP_SIZE
    );
  };

  const shareOnLinkedIn = () => {
    var sendUrl = "devpad.tistory.com/";
    window.open(
      `http://www.linkedin.com/shareArticle?mini=true&url=${sendUrl}&title="hello"&summary="test"&source=` +
        sendUrl,
      "",
      POPUP_SIZE
    );
  };

  const shareOnTwitter = () => {
    var sendText = "개발새발"; // 전달할 텍스트
    var sendUrl = "devpad.tistory.com/"; // 전달할 URL
    window.open(
      "https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl,
      "",
      POPUP_SIZE
    );
  };

  const shareWithEmail = () => {
    var sendUrl = "devpad.tistory.com/";
    const title = "testing title";
    window.open(`mailto:?subject=${title}&body=${sendUrl}`, "", POPUP_SIZE);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(sendUrl);
    setCopied(true);
  };

  const renderCopied = () => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);

      return <div className="link-message">copied!</div>;
    } else return null;
  };

  return (
    <div className="share-modal-wrapper">
      <h3 className="modal-header">Share with Friends</h3>
      <div className="share-btns">
        <div className="modal-btn share-btn" onClick={shareOnFacebook}>
          <FacebookIcon
            fontSize="large"
            sx={{ "&:hover": { color: "#4064ac" } }}
          />
        </div>
        <div className="modal-btn share-btn" onClick={shareOnLinkedIn}>
          <LinkedInIcon
            fontSize="large"
            sx={{ "&:hover": { color: "#006eab" } }}
          />
        </div>
        <div className="modal-btn share-btn" onClick={shareOnTwitter}>
          <TwitterIcon
            fontSize="large"
            sx={{ "&:hover": { color: "#1c9cea" } }}
          />
        </div>
        <div className="modal-btn share-btn" onClick={shareWithEmail}>
          <EmailIcon
            fontSize="large"
            sx={{ "&:hover": { color: "#4064ac" } }}
          />
        </div>
      </div>
      <div className="share-link">
        <input
          className="link-inputBox"
          type="text"
          value={shareUrl}
          disabled
        />
        <ContentCopyIcon
          sx={{
            position: "absolute",
            right: "15px",
            top: "8px",
            cursor: "pointer",
            "&:hover": { color: "#34cc99" },
          }}
          fontSize="small"
          onClick={copyLink}
        />
      </div>
      {renderCopied()}
    </div>
  );
};
