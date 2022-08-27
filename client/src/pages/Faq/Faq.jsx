import "./_faq.scss";
import useWindowSize from "../../hooks/useWindowSize";

const Faq = () => {
  const [height, width] = useWindowSize();

  return (
    <div className="container" data-section="terms">
      <div className="content-wrapper" data-section="terms">
        <h2>FAQ</h2>
        <div>
          Hello, my name is Cheah and I am the mother of Joinerry. Joinerry has
          started to meet my personal needs.
          <br />
          <br />
          When I first started to learn how to code, I was based in a small
          village in Finland, studying for my Master’s degree. Thanks to
          high-quality tutorials and materials on the Internet, it was easy to
          take basic knowledge about programming without challenges. Besides, I
          was able to leap from learning basic syntax to creating apps by
          building small toy projects.
          <br />
          <br />
          However, soon after, I felt there was a certain limit to growing
          enough skills to be in the tech field as a developer. I wanted to be
          involved in bigger and more complex projects and learn from others.
          <br />
          <br />
          Since there were no boot camps or programming clubs as such in the
          city where I lived, it was difficult to find a group project. Also, I
          could not find online communities to fulfill this purpose. I thought
          that there might be many people like me who want to have group project
          experiences but struggle to find one. So I decided to build an online
          community where future developers can find teams and projects easily.
          <br />
          <br />
          This is the story of how Joinerry was born.
          <br />
          <br />
          No matter where you are, I hope you find awesome group projects from
          Joinerry and develop your skill with future developers.
        </div>
        <h3>Every contribution counts!</h3>
        <div>
          Do you find errors while using the app? Please{" "}
          <a
            className="text-bold"
            href="https://github.com/chepark/full-stack-joinerry/issues"
          >
            create an issue
          </a>{" "}
          on our Github and we will take a look. The{" "}
          <a
            className="text-bold"
            href="https://github.com/chepark/full-stack-joinerry"
          >
            source code
          </a>{" "}
          is on Github.
        </div>
        <h3>Joinerry welcomes your feedback!</h3>
        <div>
          Do you have an idea to improve our services and user experience?
          Please drop me an email{" "}
          <span className="text-bold">chaeahpark.kr@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default Faq;
