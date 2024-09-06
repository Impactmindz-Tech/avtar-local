import { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HeaderBack from "@/components/HeaderBack";
import Images from "@/constant/Images";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  // SHOW/HIDE ANCHOR LINKS
  const handleAnchorLinksShow = () => {
    document.querySelector(".terms-and-policies").classList.add("show");
  };
  const handleAnchorLinksHide = () => {
    document.querySelector(".terms-and-policies").classList.remove("show");
  };

  useEffect(() => {
    // ADD ACTIVE CLASS ON FIRST LINK
    document
      .querySelector(`a[href="#privacy-policy-definitions"]`)
      ?.classList.add("active");

    // ADD/REMOVE ACTIVE CLASS FROM LINKS ON WINDOW SCROLL
    const links = document.querySelectorAll(".t-n-p-nav li a");
    const policyContainers = document.querySelectorAll(".single");
    let policyContainersPosition = [];
    policyContainers.forEach((pc) => {
      policyContainersPosition.push(pc.offsetTop);
    });
    window.addEventListener("scroll", () => {
      links.forEach((link) => {
        link.classList.remove("active");
      });
      const positionsGreaterThanWindowScrollY = policyContainersPosition.filter(
        (pcp) => {
          return window.scrollY + 200 > pcp;
        }
      );
      if (positionsGreaterThanWindowScrollY < 2) {
        Array.from(links)[0].classList.add("active");
      } else {
        Array.from(links)[
          positionsGreaterThanWindowScrollY.length - 1
        ].classList.add("active");
      }
    });

    // HIDE ANCHOR LINKS ON CLICK LINKS
    links.forEach((link) => {
      link.addEventListener("click", () => {
        handleAnchorLinksHide();
      });
    });
  }, []);
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="terms-and-policies py-10">
        <button
          type="button"
          className="show-anchor-links fixed top-[180px] left-[0px] bg-white p-2 hidden lg:block"
          onClick={handleAnchorLinksShow}
        >
          <MenuIcon className="text-[#ff5454]" />
        </button>
        <div className="container lg:max-w-full">
          <div className="flex items-center my-4">
            <div
              className="border cursor-pointer border-[#cccccc] w-[50px] h-[50px] p-2 rounded-full flex items-center justify-center"
              onClick={goBack}
            >
              <img
                src={Images.arrowLeft}
                alt="arrowLeft icon"
                className="cursor-pointer"
              />
            </div>
            <div className="flex-1 flex justify-center  2xl:text-lg font-bold 4xl:text-2xl my-5">
              {" "}
              Privacy Policy
            </div>
          </div>
          <div className="t-n-p-content flex items-start">
            <div className="t-n-p-nav w-[300px] max-h-[90svh] overflow-auto sticky top-[20px] lg:max-h-none p-4">
              <CloseIcon
                className="absolute top-[10px] right-[10px] text-[#ff5454] cursor-pointer"
                onClick={handleAnchorLinksHide}
              />
              <ul className="sm:text-[14px]">
                <li>
                  <a
                    href="#privacy-policy-definitions"
                    className="relative px-[16px] inline-block"
                  >
                    Definitions
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy-policy-personal-information-we-collect"
                    className="relative px-[16px] inline-block"
                  >
                    Personal information we collect
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy-policy-how-we-utilize-your-information"
                    className="relative px-[16px] inline-block"
                  >
                    How we utilize your information
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy-policy-how-we-share-your-information"
                    className="relative px-[16px] inline-block"
                  >
                    How we share your information
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy-policy-where-we-store-your-information"
                    className="relative px-[16px] inline-block"
                  >
                    Where we store your information
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy-policy-your-rights-and-choices"
                    className="relative px-[16px] inline-block"
                  >
                    Your Rights and Choices
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy-policy-your-informations-security"
                    className="relative px-[16px] inline-block"
                  >
                    Your Information's Security
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy-policy-data-retention-at-avatar-walk"
                    className="relative px-[16px] inline-block"
                  >
                    Data retention at Avatar Walk
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy-policy-privacy-policy-updates-at-avatar-walk"
                    className="relative px-[16px] inline-block"
                  >
                    Privacy policy updates at Avatar Walk
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy-policy-contact-us"
                    className="relative px-[16px] inline-block"
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
            <div className="t-n-p-text w-[calc(100%-300px)] inline-block pl-[40px] pb-[40vh] lg:w-full lg:pl-[12px]">
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="privacy-policy-definitions"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  1. Definitions
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  Undefined terms in this Privacy Policy have the same
                  definition as in our Terms of Service.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="privacy-policy-personal-information-we-collect"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  2. Personal information we collect
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  At Avatar Walk, we gather personal information from you as you
                  engage with our platform. This data is essential to fulfill
                  your service requests effectively. The information we collect
                  encompasses:
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    A. Information You Provide
                  </h4>
                  <div className="inner-text-padding pl-6 sm:pl-4">
                    <b>Your Profile Details:&nbsp; </b>Your Profile Details:
                    When registering on Avatar Walk, you provide us with
                    essential information, including your username, password,
                    date of birth, email address, telephone number, and other
                    data featured in your user profile. Additionally, you can
                    upload your photo or profile video. <br />
                    <br />
                    <b> User-Generated Content: &nbsp;</b>We process content you
                    create on our platform, such as photos, audios, videos,
                    comments, hashtags, reviews, and live streams (collectively
                    known as "User Content"). This includes associated metadata
                    like when, where, and by whom the content was created. Even
                    if you're not a user, your information may appear in User
                    Content created by others. We collect User Content during
                    its creation, import, or upload. If you apply effects to
                    your User Content, we may collect a version without those
                    effects.
                    <br />
                    <br />
                    <b> Messaging Data: &nbsp;</b>Information provided during
                    your use of our messaging functionalities, including chat
                    conversations with avatar or our virtual assistants. This
                    data covers the message content and information about when
                    messages were sent, received, or read, along with message
                    participants.
                    <br />
                    <br />
                    <b> Clipboard Access: &nbsp;</b>With your permission, we may
                    access text, images, or video content stored in your
                    device's clipboard. This access occurs when you initiate
                    content sharing with third-party platforms or paste
                    clipboard content into Avatar Walk.
                    <br />
                    <br />
                    <b> Purchase Details: &nbsp;</b>When you make purchases or
                    payments on our platform, such as booking an experience, we
                    collect transaction information, including payment card
                    details, billing, delivery info, contact details, and
                    purchased items.
                    <br />
                    <br />
                    <b> Contact Sync: &nbsp;</b>If you choose to sync your phone
                    contacts, we'll access and collect contact information such
                    as names, phone numbers, and email addresses, matching this
                    data against existing platform users. Sharing your social
                    network contacts allows us to collect public profile data,
                    names, and profiles of your social network connections.
                    <br />
                    <br />
                    <b> Identity Verification: &nbsp;</b>In certain instances,
                    we may request proof of identity or age to access specific
                    features, obtain verified accounts, or ensure you meet age
                    requirements for using Avatar Walk.
                    <br />
                    <br />
                    <b> Correspondence: &nbsp;</b>Any information you send to us
                    in your communications, including support requests or
                    feedback.
                    <br />
                    <br />
                    <b> Survey and Event Data: &nbsp;</b>Information obtained
                    through surveys, research, promotions, contests, marketing
                    initiatives, challenges, competitions, or events organized
                    or sponsored by Avatar Walk in which you participate.
                  </div>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    B. Information We Gather Automatically
                  </h4>
                  <div className="inner-text-padding pl-6 sm:pl-4">
                    <b>Usage Insights:</b>We collect data related to your
                    interactions with Avatar Walk, such as how you engage with
                    content, view advertisements, watch live streams, and your
                    interaction history with other users.
                    <br /> <br /> <b>Inferred Details:</b>For content
                    personalization, we may infer your interests, location,
                    gender, and age range.
                    <br /> <br /> <b>Technical Data:</b>We automatically gather
                    technical information regarding your device, including your
                    IP address, user agent, mobile carrier, time zone settings,
                    advertising identifiers, device model, screen resolution,
                    operating system, app and file details, audio settings, and
                    connected audio devices. If you log in from multiple
                    devices, we may use your profile data to link your activity.
                    <br /> <br /> <b>Location Insights:</b>We collect
                    approximate location information based on your SIM card
                    and/or IP address. With your consent, we may also access
                    precise location data (like GPS). Additionally, we gather
                    location details (e.g., tourist spots) if you choose to add
                    them to your User Content.
                    <br /> <br /> <b>Cookies and Similar Technologies:</b>Avatar
                    Walk and our partners utilize Cookies and similar
                    technologies to automatically gather data. These
                    technologies allow us to understand your usage patterns,
                    optimize your experience, measure ad effectiveness, and
                    improve the platform. We also use Cookies to promote Avatar
                    Walk on other platforms and websites. To learn how to manage
                    Cookies, please see the "Your Rights and Choices" section
                    below.
                  </div>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    C. Data From External Sources
                  </h4>
                  <div className="inner-text-padding pl-6 sm:pl-4">
                    We may obtain information as described in this Privacy
                    Policy from various external sources. This can include:
                    <br /> <br />
                    <b>Third-Party Social Networks: </b>If you register or log
                    in to Avatar Walk using third-party social network accounts
                    like Facebook, Twitter, Instagram, or Google, you may
                    provide us with your account details. Conversely, these
                    networks may share information with us, such as your
                    username, public profile, and related data. We may also
                    exchange specific information with your social network, such
                    as your app ID, access token, and the referring URL when you
                    connect your Avatar Walk account to other services. <br />{" "}
                    <br />
                    <b>Partners and Advertisers: </b>Our partners, advertisers,
                    and measurement companies may share data about your
                    activities outside of Avatar Walk. This encompasses your
                    interactions on other websites, apps, or in physical stores,
                    as well as the products or services you purchase. They may
                    provide us with data like mobile identifiers for
                    advertising, phone numbers, and cookie identifiers to help
                    link your actions beyond the platform with your Avatar Walk
                    account. <br /> <br />
                    <b>Other Users and Public Sources:</b>Information about you
                    may come from other users, whether you are featured or
                    mentioned in User Content, direct messages, complaints,
                    appeals, requests, or feedback submitted to us.
                    Additionally, we may collect publicly available information
                    from various sources. <br /> <br />
                    <b>Merchants and Payment Providers:</b>Merchants and
                    providers handling payments and transactions may share
                    details about your purchases, payment confirmations.
                  </div>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="privacy-policy-how-we-utilize-your-information"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  3. How we utilize your information
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  At Avatar Walk, we make use of your information to enhance
                  your experience, support the platform's operations, ensure you
                  can access its features, and enforce our Terms of Service.
                  Additionally, we personalize content, promote Avatar Walk, and
                  tailor your ad encounters. Here's how we generally employ the
                  information we gather:
                  <br />
                  <br /> <b>Service Enhancement:</b>We use your data to improve
                  our services, troubleshoot issues, conduct research, and
                  request your feedback.
                  <br />
                  <br /> <b>Personalization:</b>We personalize the content you
                  see based on your preferences, such as country settings and
                  your interactions on the platform.
                  <br />
                  <br /> <b>Promotions:</b>We may send promotional materials via
                  instant messaging or email on our behalf or from trusted third
                  parties.
                  <br />
                  <br /> <b>Product Development:</b>Your data aids us in
                  developing and enhancing the platform.
                  <br />
                  <br /> <b>Advertising Effectiveness:</b>We measure the
                  effectiveness of the ads and content we deliver, including
                  targeted advertising.
                  <br />
                  <br /> <b>Social Engagement:</b>Your information supports
                  social functions, allowing connections, sharing, and
                  interactions with other users.
                  <br />
                  <br /> <b>Virtual Items:</b>We enable your participation in
                  the virtual items program.
                  <br />
                  <br /> <b>Advertising and Marketing:</b>User-generated content
                  may be used in our advertising and marketing efforts,
                  promoting events and popular topics on the platform.
                  <br />
                  <br /> <b>Usage Analysis:</b>We analyze how you use the
                  platform across your devices.
                  <br />
                  <br /> <b>Inference:</b>We may infer additional details about
                  you, such as age range, gender, and interests.
                  <br />
                  <br /> <b>Security:</b>Your information helps us maintain
                  platform security, identify and combat abuse, fraud, and
                  illegal activity.
                  <br />
                  <br /> <b>Effective Presentation:</b>We ensure that content is
                  presented optimally for you and your device.
                  <br />
                  <br /> <b>Safety and Compliance:</b>We scan and review user
                  content and messages to enforce our policies and guidelines.
                  <br />
                  <br /> <b>Research:</b>Independent researchers may conduct
                  research on the platform.
                  <br />
                  <br /> <b>Identity Verification:</b>We use your data to verify
                  your identity or age as necessary.
                  <br />
                  <br /> <b>Policy Enforcement:</b>We enforce our platform's
                  terms, guidelines, and policies.
                  <br />
                  <br /> <b>Location-Based Services:</b>With your consent, we
                  provide location-based services and personalized content.
                  <br />
                  <br /> <b>Technology Improvement:</b>Your data contributes to
                  the enhancement of our technology and algorithms.
                  <br />
                  <br /> <b>Sales and Support:</b>We facilitate sales,
                  promotions, purchases, and user support.
                  <br />
                  <br />
                  <b>
                    Please note that your privacy and data security are of
                    utmost importance to us.
                  </b>
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="privacy-policy-how-we-share-your-information"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  4. How we share your information
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  At Avatar Walk, we're transparent about how your information
                  is shared to enhance your experience. Here's how we do it:
                  <br /> <br />
                  <b> Business Partners:</b>If you register using your social
                  network accounts, you may provide us with certain details, and
                  we may share some information with the respective social
                  network. When you share content on social media, it may appear
                  on those platforms, or we'll provide a content link for
                  instant messaging.
                  <br /> <br />
                  <b> Service Providers:</b>We collaborate with service
                  providers who assist our operations, including cloud services
                  and content moderation to ensure a safe and enjoyable
                  environment. Payment processors handle transactions, analytics
                  providers help us optimize the platform, and we work with
                  marketing service providers.
                  <br /> <br />
                  <b> Advertisers and Measurement Partners:</b>We share
                  information with advertisers and third-party measurement firms
                  to track ad views and clicks, allowing us to provide targeted
                  ads.
                  <br /> <br />
                  <b> Independent Researchers:</b>We share data with independent
                  researchers for research that meets specific criteria.
                  <br /> <br />
                  <b> Our Corporate Group:</b>Information may be shared within
                  our corporate group to support and enhance the platform and
                  prevent misuse.
                  <br /> <br />
                  <b> Legal Compliance:</b>If legally required, we'll share your
                  information with law enforcement or public authorities. This
                  includes complying with legal obligations, investigating
                  violations of our terms, addressing security or fraud issues,
                  and protecting rights, property, or safety as permitted by
                  law.
                  <br /> <br />
                  <b> Public Profiles:</b>Please be aware that public profiles
                  and their content may be visible to anyone on the platform,
                  shared by friends and followers, and indexed by search engines
                  and news sites.
                  <br /> <br />
                  <b> Business Transactions:</b>In the event of business
                  transactions like sales, mergers, partnerships, or asset
                  transfers, user information may be among the assets shared.
                  Your privacy and data security remain a top priority at Avatar
                  Walk.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="privacy-policy-where-we-store-your-information"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  5. Where we store your information
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  At Avatar Walk, your information may be stored on servers in
                  various global locations, ensuring our services are accessible
                  worldwide. We maintain servers in different regions to provide
                  a seamless experience for our users.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="privacy-policy-your-rights-and-choices"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  6. Your Rights and Choices
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  At Avatar Walk, we respect your rights and offer you choices
                  regarding your data. Depending on applicable laws, you may
                  have rights that include accessing, updating, deleting, or
                  correcting your data, being informed about how your data is
                  processed, and the ability to file complaints with relevant
                  authorities.
                  <br />
                  <br />
                  You have control over most of your profile information and
                  content on Avatar Walk. You can manage who can view your live
                  streams, send you messages, or leave comments on your content
                  through the settings. If you wish, you can delete your account
                  entirely from the settings.
                  <br />
                  <br />
                  Additionally, you can customize your cookie preferences by
                  adjusting your device's browser settings. Please refer to your
                  specific browser's instructions for guidance. Keep in mind
                  that disabling certain cookies may affect certain aspects of
                  the Avatar Walk platform. Please note that cookie preferences
                  are specific to the device and browser you use, so you may
                  need to adjust settings for each one individually.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="privacy-policy-your-informations-security"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  7. Your Information's Security
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  At Avatar Walk, we prioritize the security and confidentiality
                  of your information. We take reasonable steps to protect your
                  data, including encryption. However, please be aware that the
                  internet's inherent nature may pose security risks when
                  transmitting information on our platform. Your data's
                  transmission is ultimately your responsibility.
                  <br /> <br />
                  We implement suitable technical and organizational measures to
                  safeguard your data and privacy, aligning with the level of
                  risk to users' rights and freedoms. These measures are
                  consistently maintained and updated for enhanced system
                  security.
                  <br /> <br />
                  On occasion, we may feature links to our partner networks,
                  advertisers, and affiliates on our platform. It's essential to
                  recognize that these websites maintain their privacy policies,
                  and we cannot be held responsible for them. We recommend
                  reviewing their policies before providing any personal
                  information.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="privacy-policy-data-retention-at-avatar-walk"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  8. Data retention at Avatar Walk
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  At Avatar Walk, we maintain your information only for the
                  duration required to support our platform and the purposes
                  outlined in this Privacy Policy. We also retain data to
                  fulfill contractual obligations, comply with legal mandates,
                  serve legitimate business interests (such as platform
                  improvement, security, and stability enhancement), and for
                  legal defense.
                  <br />
                  <br />
                  Our retention periods vary based on multiple factors,
                  including the nature of the information and its intended use.
                  For example, when processing your profile information to
                  provide you with our platform, we retain this data as long as
                  your account is active. If you violate our Terms of Service,
                  Community Guidelines, or other policies, we may promptly
                  remove your profile and User Content from public view.
                  However, certain information about you may be retained to
                  address the violation effectively.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="privacy-policy-privacy-policy-updates-at-avatar-walk"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  9. Privacy policy updates at Avatar Walk
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  Our Privacy Policy may undergo periodic updates. To inform you
                  of any changes, we will revise the "Last Updated" date at the
                  top of the policy and either post the revised Privacy Policy
                  or provide any necessary notice as required by relevant laws.
                  If you continue to access or use our platform following the
                  updated policy, it indicates your acceptance of the changes.
                  If you do not agree with the updated policy, please cease
                  using our platform.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="privacy-policy-contact-us"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  10. Contact us
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  If you have any questions, comments, complaints, or requests
                  related to this Privacy Policy, please reach out to us
                  through:
                  <b>info@avatarwalk.com</b>
                  <br />
                  <br />
                  We will make every effort to address your inquiries promptly.
                  Your right to file a complaint with the relevant data
                  protection authority, where applicable, remains unaffected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
