import { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Images from "@/constant/Images";
import { useNavigate } from "react-router-dom";

const Terms = () => {
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
      .querySelector(`a[href="#user-terms-our-mission"]`)
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
            Terms of Service
          </div>
        </div>

        <div className="t-n-p-content flex items-start">
          <div className="t-n-p-nav w-[300px] max-h-[90svh] overflow-auto sticky top-[20px] lg:max-h-none p-4">
            <CloseIcon
              className="absolute top-[10px] right-[10px] text-[#ff5454] cursor-pointer"
              onClick={handleAnchorLinksHide}
            />
            <h5 className="mb-4 font-bold text-[18px] sm:text-[16px]">
              User Terms
            </h5>
            <ul className="sm:text-[14px]">
              <li>
                <a
                  href="#user-terms-our-mission"
                  className="relative px-[16px] inline-block"
                >
                  Our mission
                </a>
              </li>
              <li>
                <a
                  href="#user-terms-searching-and-booking-on-avatar-walk"
                  className="relative px-[16px] inline-block"
                >
                  Searching and Booking on Avatar Walk
                </a>
              </li>
              <li>
                <a
                  href="#user-terms-handling-changes-issues-and-refunds"
                  className="relative px-[16px] inline-block"
                >
                  Handling Changes, Issues, and Refunds
                </a>
              </li>
              <li>
                <a
                  href="#user-terms-your-responsibilities-and-acknowledgment-of-risks"
                  className="relative px-[16px] inline-block"
                >
                  Your Responsibilities and Acknowledgment of Risks
                </a>
              </li>
            </ul>
            <h5 className="my-4 font-bold text-[18px] sm:text-[16px]">
              Avatar Terms
            </h5>
            <ul className="sm:text-[14px]">
              <li>
                <a
                  href="#avatar-terms-streaming-with-avatar-walk"
                  className="relative px-[16px] inline-block"
                >
                  Streaming with Avatar Walk
                </a>
              </li>
              <li>
                <a
                  href="#avatar-terms-managing-your-avatar-walk-experience"
                  className="relative px-[16px] inline-block"
                >
                  Managing Your Avatar Walk Experience
                </a>
              </li>
              <li>
                <a
                  href="#avatar-terms-cancellations-travel-issues-and-booking-changes"
                  className="relative px-[16px] inline-block"
                >
                  Cancellations, Travel Issues, and Booking Changes
                </a>
              </li>
              <li>
                <a
                  href="#avatar-terms-taxes"
                  className="relative px-[16px] inline-block"
                >
                  Taxes
                </a>
              </li>
            </ul>
            <h5 className="my-4 font-bold text-[18px] sm:text-[16px]">
              General Terms
            </h5>
            <ul className="sm:text-[14px]">
              <li>
                <a
                  href="#general-terms-user-reviews"
                  className="relative px-[16px] inline-block"
                >
                  User Reviews
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-sharing-content"
                  className="relative px-[16px] inline-block"
                >
                  Sharing Content
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-service-charges"
                  className="relative px-[16px] inline-block"
                >
                  Service Charges
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-avatar-walk-platform-rules"
                  className="relative px-[16px] inline-block"
                >
                  Avatar Walk Platform Rules
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-termination-suspension-and-other-measures"
                  className="relative px-[16px] inline-block"
                >
                  Termination, Suspension and other Measures
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-your-relationship-with-avatar-walk"
                  className="relative px-[16px] inline-block"
                >
                  Your Relationship with Avatar Walk
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-acceptance-of-terms"
                  className="relative px-[16px] inline-block"
                >
                  Acceptance of Terms
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-changes-to-the-terms"
                  className="relative px-[16px] inline-block"
                >
                  Changes to the Terms
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-your-avatar-walk-account"
                  className="relative px-[16px] inline-block"
                >
                  Your Avatar Walk Account
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-your-use-of-avatar-walk-services"
                  className="relative px-[16px] inline-block"
                >
                  Your Use of Avatar Walk Services
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-respecting-intellectual-property"
                  className="relative px-[16px] inline-block"
                >
                  Respecting Intellectual Property
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-content"
                  className="relative px-[16px] inline-block"
                >
                  Content
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-user-content"
                  className="relative px-[16px] inline-block"
                >
                  User Content
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-indemnification"
                  className="relative px-[16px] inline-block"
                >
                  Indemnification
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-no-warranties"
                  className="relative px-[16px] inline-block"
                >
                  No Warranties
                </a>
              </li>
              <li>
                <a
                  href="#general-terms-limitation-of-liability"
                  className="relative px-[16px] inline-block"
                >
                  Limitation of Liability
                </a>
              </li>
            </ul>
            <h5 className="my-4 font-bold text-[18px] sm:text-[16px]">
              Service Charges
            </h5>
            <ul className="sm:text-[14px]">
              <li>
                <a
                  href="#service-charges-fee-structure"
                  className="relative px-[16px] inline-block"
                >
                  Fee Structure
                </a>
              </li>
              <li>
                <a
                  href="#service-charges-user-charges"
                  className="relative px-[16px] inline-block"
                >
                  User Charges
                </a>
              </li>
              <li>
                <a
                  href="#service-charges-avatar-charges"
                  className="relative px-[16px] inline-block"
                >
                  Avatar Charges
                </a>
              </li>
              <li>
                <a
                  href="#service-charges-payment-processing"
                  className="relative px-[16px] inline-block"
                >
                  Payment Processing
                </a>
              </li>
              <li>
                <a
                  href="#service-charges-fee-transparency"
                  className="relative px-[16px] inline-block"
                >
                  Fee Transparency
                </a>
              </li>
              <li>
                <a
                  href="#service-charges-changes-to-fee-structure"
                  className="relative px-[16px] inline-block"
                >
                  Changes to Fee Structure
                </a>
              </li>
            </ul>
          </div>
          <div className="t-n-p-text w-[calc(100%-300px)] inline-block pl-[40px] pb-[40vh] lg:w-full lg:pl-[12px]">
            <div className="user-terms">
              <h5 className="term-heading font-semibold mb-4 text-[18px]">
                User Terms
              </h5>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="user-terms-our-mission"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  1. Our Mission
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3">
                  <h4 className="text-[20px] font-semibold mb-4 sm:text-[15px]">
                    Bridging Avatars with the Perfect Experience
                  </h4>
                  <p className="sm:text-[12px]">
                    At the heart of our mission is the vision of a world where
                    every avatar can uncover their ideal adventures, no matter
                    their digital destination. Whether you seek serene
                    landscapes, breathtaking architecture, or engaging virtual
                    tours, explore our extensive catalog of avatar experiences
                    tailored to your preferences. Dive deeper into each listing
                    by immersing yourself in their detailed descriptions, vivid
                    images, insights into the Experiences, and feedback from
                    fellow travelers. If questions arise along your journey,
                    never hesitate to connect with the Avatars for guidance.
                  </p>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="user-terms-searching-and-booking-on-avatar-walk"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  2. Searching and Booking on Avatar Walk
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3">
                  <h4 className="text-[20px] font-semibold mb-4 sm:text-[15px]">
                    A : Exploring Avatars and Booking Experiences
                  </h4>
                  <p className="sm:text-[12px]">
                    Discovering Avatar and Experiences on Avatar Walk is as
                    simple as tailoring your search criteria – specifying the
                    type of experience, digital realm, chosen date, and the
                    number of experiences. You can also employ filters to refine
                    your exploration further. Search results are generated
                    considering various factors like relevance to your search,
                    pricing, availability, reviews, avatar history, popularity,
                    user feedback, and other relevant details.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    B: Confirming Your Experience
                  </h4>
                  <p className="sm:text-[12px]">
                    When you decide to book an avatar experience, you commit to
                    covering all costs associated with your adventure, which
                    includes the experience fee, any applicable service charges,
                    taxes, or any other expenses disclosed during the checkout
                    process (collectively referred to as the "Total"). You also
                    acknowledge that Avatar Walk may use the chosen Payment
                    Method to process any Damage Claim amounts. Upon receipt of
                    your booking confirmation, a contractual agreement for the
                    Experience (a "Reservation") is established directly between
                    you and the Avatar. Alongside these Terms, you are obliged
                    to adhere to all the conditions specified within the
                    Reservation, including the cancellation policy and any other
                    rules, standards, policies, or requirements. Additionally,
                    please note that some Avatars may operate with a party
                    stream to enhance your avatar experience.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    C: Experience Recording- Virtual Space Usage
                  </h4>
                  <p className="sm:text-[12px]">
                    A recording grants you a limited license to access and
                    utilize the virtual space provided. While you enjoy your
                    stream, the Avatar retains the right to access your
                    information if it's reasonably necessary, allowed under your
                    agreement with the avatar, and complies with relevant laws.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    D: Reservations for Experiences and Other Avatar Services
                  </h4>
                  <p className="sm:text-[12px]">
                    A Reservation for an Experience or any other Avatar Service
                    permits your participation, attendance, or usage of the
                    specified avatar service. You are responsible for ensuring
                    that both yourself and any companions show on time.
                    Additionally, you must inform the avatar of any medical
                    conditions, network limitations, or other circumstances that
                    could affect your ability to participate or attend the
                    stream. Unless expressly permitted, you should not include
                    anyone in the stream who hasn't been officially added as an
                    additional participant during the booking process.
                  </p>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="user-terms-handling-changes-issues-and-refunds"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  3. Handling Changes, Issues, and Refunds
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3">
                  <h4 className="text-[20px] font-semibold mb-4 sm:text-[15px]">
                    A: Cancellations and Refunds
                  </h4>
                  <p className="sm:text-[12px]">
                    In general, the refund you receive as a User when canceling
                    an Experience is 20%. From which 10% is kept by the Platform
                    and 10% will be imbursed to the Avatar. However, in some
                    cases, different policies may take precedence and determine
                    the refund amount. If unforeseen circumstances beyond your
                    control compel you to cancel an Experience, you may qualify
                    for a partial or full refund under our Extenuating
                    Circumstances Policy.
                    <br /> <br />
                    In the event of an Avatar cancellation, you will be eligible
                    for re-scheduling or a full refund.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    B: Rescheduling
                  </h4>
                  <p className="sm:text-[12px]">
                    Both Avatars and Users hold the responsibility for any
                    changes made to their bookings, whether these adjustments
                    are agreed upon through the Avatar Walk Platform or carried
                    out via direct chat service interactions facilitated by
                    Avatar Walk. These alterations, referred to as
                    "Rescheduling," may entail additional costs, fees, or taxes
                    that are agreed upon as part of the modification process. Be
                    aware that all parties involved need to consent to any
                    Rescheduling.
                  </p>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="user-terms-your-responsibilities-and-acknowledgment-of-risks"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  4. Your Responsibilities and Acknowledgment of Risks
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3">
                  <h4 className="text-[20px] font-semibold mb-4 sm:text-[15px]">
                    A : Your Duties
                  </h4>
                  <div className="sm:text-[12px]">
                    You hold responsibility and are legally liable for your own
                    actions and any actions taken by individuals you invite to
                    share or access an Experience, or any other Service. This
                    entails various responsibilities, such as ensuring that:
                    <ul
                      style={{
                        listStyle: "disc",
                        marginTop: "10px",
                        paddingLeft: "20px",
                      }}
                    >
                      <li>
                        Don’t ask for any illegal activity from the Avatar such
                        as drugs, violence, harassment or sexual activity.
                      </li>
                      <li>
                        You conduct yourself with integrity, treat others
                        respectfully, and adhere to relevant laws without
                        exception.
                      </li>
                      <li>
                        If you make a reservation for a minor or bring a minor
                        to a stream, you must possess the legal authority to act
                        on their behalf, and you are entirely responsible for
                        their supervision.
                      </li>
                    </ul>
                  </div>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    B: Acknowledging Risks
                  </h4>
                  <p className="sm:text-[12px]">
                    It's important to acknowledge that numerous activities
                    inherently involve risks. By utilizing the Avatar Walk
                    Platform and any Content, which includes your streaming of
                    an Experience, engagement in an Experience, utilization of
                    any other Avatar Service, or interactions with other
                    Members, either online or in person, you agree to accept the
                    full extent of these risks, as permitted by relevant laws.
                    This signifies that you are obliged to conduct due diligence
                    to assess whether an Avatar Service suits your needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="avatar-terms">
              <h5 className="term-heading font-semibold my-4 text-[18px]">
                Avatar Terms
              </h5>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="avatar-terms-streaming-with-avatar-walk"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  1. Streaming with Avatar Walk
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3">
                  <h4 className="text-[20px] font-semibold mb-4 sm:text-[15px]">
                    A: Becoming a Host
                  </h4>
                  <p className="sm:text-[12px]">
                    As an Avatar, you gain the privilege of utilizing the Avatar
                    Walk Platform to share your Experience, or other Services
                    with our dynamic community of Users, all while earning
                    income. It's a straightforward process to create an
                    Experience, and you retain control over your streaming,
                    allowing you to set the price, availability, and guidelines
                    for each of your Experiences.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    B: Agreements with Users
                  </h4>
                  <p className="sm:text-[12px]">
                    Upon accepting a booking request or receiving a booking
                    confirmation through the Avatar Walk Platform, you are
                    establishing a direct contract with the User. This contract
                    obligates you to provide your Service under the conditions
                    and at the price outlined in your Experience. Additionally,
                    you agree to cover any applicable fees, including Avatar
                    Walk's service fee and relevant taxes, for each booking.
                    Your payout will be subject to deductions for the amounts
                    you owe, unless an alternative arrangement is mutually
                    agreed upon by both parties. Any terms, policies, or
                    conditions you incorporate into a supplemental contract with
                    Users must adhere to two key principles:
                    <br />
                    They must align with these Terms, our Additional Legal
                    Terms, Policies, and the information found within your
                    Experience. They should be prominently presented in your
                    Experience description.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    C: Avatar Independence
                  </h4>
                  <p className="sm:text-[12px]">
                    Your relationship with Avatar Walk is that of an independent
                    individual or entity, distinct from that of an employee,
                    agent, joint venturer, or partner of Avatar Walk. The
                    exception to this is Avatar Payments, which operates as a
                    payment collection agent. Avatar Walk does not exert control
                    over your Service. You maintain full discretion, deciding if
                    and when to provide Services, and determining the price and
                    terms of service on your own.
                  </p>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="avatar-terms-managing-your-avatar-walk-experience"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  2. Managing Your Avatar Walk Experience
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3">
                  <h4 className="text-[20px] font-semibold mb-4 sm:text-[15px]">
                    A: Creating and Maintaining Your Experience
                  </h4>
                  <p className="sm:text-[12px]">
                    Avatar Walk provides you with user-friendly tools for
                    setting up and managing your Experiences. To ensure a
                    seamless experience for your customers, it's essential that
                    your Experience contains complete and accurate information
                    about your Tour. This should include details about pricing,
                    additional charges, and any applicable rules or requirements
                    for your Customers or Demands. You bear the responsibility
                    for keeping your Experience information, including calendar
                    availability and visual content such as photos, consistently
                    updated and precise. You may maintain a single Experience
                    for each Place, but if a location offers multiple places,
                    you're welcome to create multiple Experiences.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    B: Understanding Legal Obligations
                  </h4>
                  <p className="sm:text-[12px]">
                    You are required to have a thorough understanding of and
                    adhere to all applicable laws, rules, regulations, and
                    contracts with third parties that relate to your Experiences
                    or Services. For instance, places or properties may restrict
                    or prohibit video capturing, live streaming, or speaking.
                    Certain properties may enforce security laws that limit
                    access to electronics or digital equipment. Additionally,
                    some jurisdictions may require Avatars to register, obtain
                    permits, or acquire licenses before providing specific
                    servicess, such as recording, longer-term stays, talking,
                    guided tours, or vehicle operation. In some areas, the
                    Services you wish to offer may be entirely prohibited. You
                    are accountable for identifying which rules apply to the
                    Services you intend to provide in your location.
                    <br />
                    <br />
                    Any information we provide regarding legal requirements
                    serves an informational purpose only, and we recommend
                    seeking independent legal advice if you have any doubts
                    about how local laws may apply to your situation. <br />
                    Furthermore, it is your responsibility to handle personal
                    data of Users and other individuals in accordance with
                    applicable privacy laws and these Terms, which include our
                    Avatar Privacy Standards.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    C: Listing Ranking
                  </h4>
                  <div className="sm:text-[12px]">
                    The order in which your Listings appear in search results on
                    the Avatar Walk Platform is influenced by various factors,
                    including:
                    <ul
                      style={{
                        listStyle: "disc",
                        marginTop: "10px",
                        paddingLeft: "20px",
                      }}
                    >
                      <li>
                        User-specific search criteria (e.g. the number of
                        Experiences, trip dates, and budget).
                      </li>
                      <li>
                        Attributes of your Listings (e.g. price, availability,
                        images, Reviews, your status as an Avatar, Listing age,
                        and overall popularity).
                      </li>
                      <li>
                        User booking experience (e.g., Avatar’s customer service
                        and cancellation history, ease of booking).
                      </li>
                      <li>
                        Specific Avatar requirements (e.g., minimum or maximum
                        reviews, booking deadlines).
                      </li>
                      <li>
                        User preferences (e.g., past experiences, saved
                        Listings, and the location from which the User is
                        searching).
                      </li>
                      Please note that search results may display differently on
                      our mobile application compared to our website. Avatar
                      Walk may allow Avatars to promote their Listings in search
                      results or other areas of the platform by paying an
                      additional fee. For more information about the factors
                      influencing your Listing's visibility in search results,
                      our current promotional initiatives (if any), and details
                      about how we identify promoted content.
                    </ul>
                  </div>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    D: Your Responsibilities
                  </h4>
                  <p className="sm:text-[12px]">
                    You are accountable for your own actions and omissions and
                    are also responsible for the conduct of anyone involved in
                    delivering your Services. This responsibility extends to
                    setting your prices and establishing the rules and
                    requirements for your experience. Any fees or charges must
                    be transparently described within your experience
                    description, and you should refrain from collecting
                    additional fees or charges outside the Avatar Walk Platform.
                    Under no circumstances should you encourage Guests to create
                    third-party accounts, post reviews, share their contact
                    information, or engage in activities outside the Avatar Walk
                    Platform in violation of our Off-Platform Policy.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    E: Your Acknowledgment of Risks
                  </h4>
                  <p className="sm:text-[12px]">
                    You are aware that live streaming involves inherent risks
                    and agree that you bear the entire risk stemming from your
                    use of the Avatar Walk Platform, provision of Host Services,
                    and any interactions with other Members, whether in person
                    or online. This means you must conduct a thorough
                    investigation of the Avatar Walk Platform and any applicable
                    laws, rules, regulations, or obligations relevant to your
                    Experiences or Services. You should not rely on any legal
                    statements made by Avatar Walk.
                  </p>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="avatar-terms-cancellations-travel-issues-and-booking-changes"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  3. Cancellations, Travel Issues, and Booking Changes.
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3">
                  <h4 className="text-[20px] font-semibold mb-4 sm:text-[15px]">
                    A: Cancellations and Travel Issues
                  </h4>
                  <p className="sm:text-[12px]">
                    Normally, when a Guest cancels an Experience, the amount you
                    receive is 10% by the applicable cancellation policy for the
                    Experiences. As a host, it's crucial not to cancel on a User
                    without a valid reason, as per our Extenuating Circumstances
                    Policy or applicable law. In the event of an unwarranted
                    cancellation, we may levy a cancellation fee and impose
                    other consequences.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    B: Rescheduling
                  </h4>
                  <p className="sm:text-[12px]">
                    Both Avatars and Users are responsible for any Rescheduling
                    made through the Avatar Walk Platform or requested via
                    direct customer service, and they agree to cover any
                    additional amounts, fees, or taxes associated with such
                    modifications.
                  </p>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="avatar-terms-taxes"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  4. Taxes
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3">
                  <h4 className="text-[20px] font-semibold mb-4 sm:text-[15px]">
                    A: Avatar Tax Responsibilities
                  </h4>
                  <p className="sm:text-[12px]">
                    As a host, it's your responsibility to understand and meet
                    your obligations under relevant laws concerning Taxes, which
                    may include VAT, traveling taxes, income taxes, or other
                    applicable indirect taxes.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    B: Tax Information
                  </h4>
                  <p className="sm:text-[12px]">
                    In certain regions, Tax regulations might require us to
                    collect Tax-related information from you, withhold Taxes
                    from your payouts, or both. Failure to provide sufficient
                    documentation for withholding Taxes may result in
                    withholding payouts up to the required amount as mandated by
                    law until you provide the necessary documents. Avatar Walk
                    may also issue invoices or similar documentation for VAT,
                    GST, consumption, or other Taxes on your behalf,
                    facilitating accurate tax reporting for you, users, and
                    their organizations.
                    <br />
                    <br />
                    Avatar Walk aims to assist you with your tax obligations,
                    but it's important for you to be aware of and fulfill your
                    Tax responsibilities, which can vary based on your location
                    and the nature of your services.
                  </p>
                </div>
              </div>
            </div>
            <div className="general-terms">
              <h5 className="term-heading font-semibold my-4 text-[18px]">
                General Terms
              </h5>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-user-reviews"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  1. User Reviews
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  Following each Avatar Walk experience, both participants will
                  have the chance to leave reviews for each other. Your review
                  should be truthful and should adhere to our guidelines,
                  avoiding any discriminatory, offensive, defamatory, or
                  otherwise inappropriate language in accordance with our
                  Content Policy and Review Guidelines. Please note that these
                  reviews are not independently verified by Avatar Walk for
                  accuracy and may occasionally contain inaccuracies or be
                  misleading.
                  <br />
                  User reviews are a valuable way for participants to share
                  their experiences and provide insights into what to expect
                  during an Experience. We encourage honest and respectful
                  feedback to enhance the overall community experience.
                </p>
                <p></p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-sharing-content"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  2. Sharing Content
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  On the Avatar Walk platform, you have the option to contribute
                  various forms of content, such as feedback, text, images,
                  audio, and video (collectively, “Content”). When you share
                  Content, you grant Avatar Walk a non-exclusive, worldwide,
                  royalty-free, perpetual, irrevocable, sub-licensable, and
                  transferable license to use, modify, distribute, publish, and
                  promote your Content. If your Content contains personal
                  information, our Privacy Policy outlines how we handle such
                  data. If Avatar Walk initiates or funds the creation of
                  Content, we may claim ownership of it, and this will be
                  specified in additional terms or disclosures. You are
                  responsible for ensuring that your Content does not violate
                  the intellectual property or privacy rights of any third
                  party.
                  <br />
                  <br />
                  All Content must adhere to our Content Guidelines, which
                  prohibit discriminatory, obscene, harassing, deceptive,
                  violent, or illegal content.
                </p>
                <p></p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-service-charges"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  3. Service Charges
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  Avatar Walk may impose fees, including applicable taxes, on
                  both Avatars and Users for the use of the Avatar Walk
                  Platform. These service charges are generally non-refundable.
                  We reserve the right to adjust these service charges, and we
                  will provide Members with advance notice of any changes before
                  they take effect. Keep in mind that fee adjustments will not
                  affect bookings made before the updated charges come into
                  force. If you disagree with a fee modification, you have the
                  option to terminate your agreement at any time.
                </p>
                <p></p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-avatar-walk-platform-rules"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  4. Avatar Walk Platform Rules
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3">
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    A: Conduct Rules.
                  </h4>
                  <p className="sm:text-[12px]">
                    Please adhere to these guidelines and refrain from assisting
                    or encouraging others in violating them.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    Integrity and Respect:
                  </h4>
                  <div className="sm:text-[12px]">
                    <ul
                      style={{
                        listStyle: "disc",
                        marginTop: "10px",
                        paddingLeft: "20px",
                      }}
                    >
                      <li>Be truthful and respectful in all interactions.</li>
                      <li>
                        Avoid deceit, misrepresentation, or impersonation.
                      </li>
                      <li>Maintain politeness in your communication.</li>
                      <li>
                        Uphold our Nondiscrimination Policy; no discrimination
                        or harassment allowed.
                      </li>
                    </ul>
                  </div>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    Platform Integrity:
                  </h4>
                  <div className="sm:text-[12px]">
                    <ul
                      style={{
                        listStyle: "disc",
                        marginTop: "10px",
                        paddingLeft: "20px",
                      }}
                    >
                      <li>
                        No scraping, hacking, or attempts to undermine the
                        platform's security.
                      </li>
                      <li>
                        Do not use bots or automated tools to gather data or
                        interact with the platform.
                      </li>
                      <li>
                        No efforts to bypass or disable security measures.
                      </li>
                      <li>
                        Do not decipher, reverse-engineer, or compromise the
                        platform's software or hardware.
                      </li>
                      <li>
                        Prevent actions that may disrupt the platform's
                        functionality.
                      </li>
                      <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                        Authorized Platform Usage:
                      </h4>
                      <li>
                        Use personal information only as necessary for platform
                        transactions.
                      </li>
                      <li>Gain consent before sending commercial messages.</li>
                      <li>Access and use content for platform use only.</li>
                      <li>
                        Content usage requires permission from the owner or
                        authorization in these Terms or other agreements.
                      </li>
                    </ul>
                  </div>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    Transaction Regulations:
                  </h4>
                  <div className="sm:text-[12px]">
                    <ul
                      style={{
                        listStyle: "disc",
                        marginTop: "10px",
                        paddingLeft: "20px",
                      }}
                    >
                      <li>
                        All bookings and payments must take place within the
                        platform, except for Offline Fee Policy exceptions.
                      </li>
                      <li>
                        Do not require or promote users to engage with
                        third-party sites or services during or after booking,
                        unless authorized by Avatar Walk.
                      </li>
                      <li>Avoid any attempts to manipulate search results.</li>
                      <li>
                        Do not book Avatar Services unless you plan to use them.
                      </li>
                      <li>
                        Do not use, copy, or frame Avatar Waklk content,
                        branding, or designs without consent.
                      </li>
                    </ul>
                  </div>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    Legal Obligations:
                  </h4>
                  <div className="sm:text-[12px]">
                    <ul
                      style={{
                        listStyle: "disc",
                        marginTop: "10px",
                        paddingLeft: "20px",
                      }}
                    >
                      <li>
                        Comply with applicable laws, including privacy, data
                        protection, and export regulations.
                      </li>
                      <li>
                        When sharing someone else's personal information, ensure
                        legal compliance and authorize us to process it under
                        our Privacy Policy.
                      </li>
                      <li>
                        Familiarize yourself with and adhere to our Terms,
                        Additional Legal Terms, Policies, and Standards.
                      </li>
                      <li>
                        Parties and events during reservations must comply with
                        our event rules as referenced herein.
                      </li>
                      <li>
                        Do not use Avatar Walk, or others' names, logos, or
                        branding without permission and in line with our
                        Trademark Guidelines.
                      </li>
                      <li>
                        Avoid registering confusing domain names, social media
                        handles, or trademarks similar to Airbnb's branding.
                      </li>
                      <li>
                        Host Services offered must align with relevant laws and
                        agreements.
                      </li>
                      <li>
                        Drugs, Violence, Harassment and Sexual Activity is
                        strictly prohibited.
                      </li>
                    </ul>
                  </div>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    B: Reporting Violations.
                  </h4>
                  <p className="sm:text-[12px]">
                    If you believe a Member, Listing, or Content poses an
                    immediate risk to people or property, contact local
                    authorities before notifying Avatar Walk. <br />
                    For guideline violations, report your concerns to Avatar
                    Walk. If you've reported an issue to local authorities, we
                    may request a copy of that report. However, we are not
                    obligated to act in response to reports, except where
                    required by law.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    C: Copyright Notices.
                  </h4>
                  <p className="sm:text-[12px]">
                    To report copyright infringements on Avatar Walk, please
                    follow our Copyright Policy guidelines.
                  </p>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-termination-suspension-and-other-measures"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  5. Termination, Suspension and other Measures
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3">
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    A: Term.
                  </h4>
                  <p className="sm:text-[12px]">
                    This agreement begins when you join Avatar Walk, such as
                    creating an account, and remains in effect until either you
                    or we decide to end it as per these terms.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    B: Termination.
                  </h4>
                  <p className="sm:text-[12px]">
                    You can terminate this agreement at any time by sending us
                    an email or deleting your account. Avatar Walk can also end
                    this agreement and your account by giving you 30 days'
                    notice through email or other contact information you've
                    provided. We may terminate immediately without notice if you
                    breach these terms, violate our additional legal terms,
                    policies, applicable laws, or if we believe it's necessary
                    to protect Avatar Walk, its Members, or others. Inactive
                    accounts for over two years may be terminated without
                    notice.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    C: Member Violations.
                  </h4>
                  <div className="sm:text-[12px]">
                    If you breach these terms, our additional legal terms,
                    policies, standards, or laws, or if we reasonably believe
                    it's necessary to protect Avatar Walk, its Members, or
                    others, we may:
                    <ul
                      style={{
                        listStyle: "disc",
                        marginTop: "10px",
                        paddingLeft: "20px",
                      }}
                    >
                      <li>
                        Suspend or limit your access or use of Avatar Walk
                        and/or your account.
                      </li>
                      <li>
                        Suspend or remove Listings, Reviews, or other Content.
                      </li>
                      <li>Cancel pending or confirmed bookings.</li>
                      <li>
                        Suspend or revoke special status associated with your
                        account.
                      </li>
                      <li>
                        For minor violations, you'll receive prior notice from
                        us with an opportunity to resolve the issue. You can
                        appeal these actions by contacting customer service.
                      </li>
                    </ul>
                  </div>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    D: Legal Requirements.
                  </h4>
                  <p className="sm:text-[12px]">
                    Avatar Walk may take any action necessary to comply with the
                    law, court orders, law enforcement, or government requests.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    E: After Termination.
                  </h4>
                  <p className="sm:text-[12px]">
                    As a User, ending your Avatar Walk account will
                    automatically cancel any confirmed bookings, providing users
                    with full refunds. Terminating your account will cancel
                    confirmed bookings based on the cancellation policy. Once
                    terminated, you won't regain access to your account or
                    Content. If your access to Avatar Walk is limited, or your
                    account is suspended or terminated by us, you can't create a
                    new account or use the platform through another member's
                    account.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    F: Survival.
                  </h4>
                  <p className="sm:text-[12px]">
                    Parts that naturally outlive this agreement, will continue
                    to apply even after it ends.
                  </p>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-your-relationship-with-avatar-walk"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  6. Your Relationship with Avatar Walk:
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  Welcome to Avatar Walk, a service offered by Avatar Walk Inc.
                  or its affiliates (“Brown Technologies Ltd”)
                  <br />
                  <br />
                  As a user, you are delving into our terms of service (the
                  "Terms"), establishing the terms and conditions that define
                  your relationship with Avatar Walk. These Terms outline how
                  you can access and utilize the Platform and its associated
                  websites, services, applications, products, and content
                  (collectively known as the "Services"). It's important to note
                  that our Services are designed for personal, non-commercial
                  use. Within these Terms, "you" and "your" pertain to you, the
                  user of these Services.
                  <br />
                  <br />
                  These Terms constitute a legally binding agreement between you
                  and Avatar Walk. We strongly encourage you to thoroughly read
                  and understand them.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-acceptance-of-terms"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  7. Acceptance of Terms:
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  By using our Services, you confirm your ability to enter into
                  a binding agreement with Avatar Walk and your acceptance of
                  these Terms. Your use of our Services is also subject to our
                  Privacy Policy and Community Guidelines, which can be found on
                  the Platform or your mobile device's app store.
                  <br />
                  <br />
                  If you access our Services from a jurisdiction with specific
                  terms, you agree to those supplemental terms. If you do not
                  agree with these Terms, please do not use our Services.
                  <br />
                  <br />
                  If you use the Services on behalf of a business or entity, you
                  represent and warrant your authority to bind the entity to
                  these Terms. The business or entity is responsible for your
                  use and the use of your account by its affiliates.
                  <br />
                  <br />
                  By using our Services, you are accepting these Terms. Please
                  keep a local copy of the Terms for your reference.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-changes-to-the-terms"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  8. Changes to the Terms
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  We may modify these Terms periodically, which could include
                  updates to our Services' features, consolidating multiple
                  services into one, or in response to regulatory changes. While
                  we'll make reasonable efforts to inform users of significant
                  changes, it's important for you to regularly review the Terms
                  for any updates. The "Last Updated" date at the top of the
                  Terms indicates their effective date. Continuing to use our
                  Services after the new Terms are published implies your
                  acceptance of them. If you disagree with the new Terms, please
                  cease using our Services.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-your-avatar-walk-account"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  9. Your Avatar Walk Account
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  To use certain features of our Services, you'll need to create
                  an Avatar Walk account. When doing so, please provide
                  accurate, up-to-date information, and remember to keep your
                  details current.
                  <br />
                  <br />
                  Your account password should remain confidential and not be
                  shared with anyone else. If you suspect any unauthorized
                  access, please notify us immediately at [feedback link].
                  <br />
                  <br />
                  You're responsible for all activities under your account, both
                  to us and others.
                  <br />
                  <br />
                  We retain the right to deactivate your account, especially if
                  you violate these Terms, engage in activities that could harm
                  our Services or infringe on third-party rights, or breach any
                  laws or regulations.
                  <br />
                  <br />
                  If you decide to leave our platform and wish to delete your
                  account, reach out to us at [contact link]. We'll guide you
                  through the process. Keep in mind that once you delete your
                  account, you won't be able to reactivate it or retrieve your
                  added content.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-your-use-of-avatar-walk-services"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  10. Your Use of Avatar Walk Services
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  Your access and use of Avatar Walk Services are subject to
                  these terms and relevant laws and regulations. Please refrain
                  from:
                  <ol
                    style={{
                      listStyle: "auto",
                      margin: "10px 0",
                      paddingLeft: "20px",
                    }}
                  >
                    <li>
                      Accessing or using our Services if you lack the legal
                      capacity to agree to these terms.
                    </li>
                    <li>
                      Unauthorized copying, altering, or attempting to reverse
                      engineer our Services or content.
                    </li>
                    <li>
                      Distributing, licensing, or selling our Services or their
                      derivatives.
                    </li>
                    <li>
                      Using our Services for unauthorized commercial purposes.
                    </li>
                    <li>
                      Engaging in spamming or any form of unsolicited
                      advertisement.
                    </li>
                    <li>
                      Interfering with the proper function of our Services.
                    </li>
                    <li>
                      Attempting to impersonate others or engaging in harmful or
                      discriminatory behavior.
                    </li>
                    <li>
                      Using another person's account or attempting to create
                      false identities.
                    </li>
                    <li>
                      Uploading malicious content, infringing on copyrights, or
                      engaging in harmful activities.
                    </li>
                    <li>
                      Additionally, your use of Avatar Walk Services must adhere
                      to our Community Guidelines.
                    </li>
                  </ol>
                  We retain the right to remove or disable access to content for
                  various reasons, including violations of our Terms and
                  Guidelines. Our automated systems analyze content for
                  personalized features, security, and user safety.
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-respecting-intellectual-property"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  11. Respecting Intellectual Property
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  We hold intellectual property rights in high regard and expect
                  you to do the same. By accessing and using our Services, you
                  agree not to infringe upon any intellectual property rights.
                  We retain the right to block access or terminate the accounts
                  of users, with or without notice, if they are found to
                  infringe on copyrights or other intellectual property rights.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-content"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  12. Content
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  In the context of Avatar Walk, all content, software, visuals,
                  text, graphics, logos, intellectual property, and the overall
                  "look and feel" of our Services, including audio, videos, and
                  music (collectively referred to as the "Avatar Walk Content"),
                  are either owned or licensed by Avatar Walk. You, or your
                  licensors, own any User Content you upload or transmit through
                  our Services. Unauthorized use of Avatar Walk Content for
                  purposes not explicitly allowed by these Terms is prohibited.
                  This includes downloading, copying, reproducing, distributing,
                  broadcasting, selling, or exploiting such content without our
                  or our licensors' prior written consent. We and our licensors
                  retain all rights not expressly granted in their content.
                  <br />
                  <br />
                  Under the Terms, you have a limited, non-transferable license
                  to access and use the Services for personal, non-commercial
                  purposes. TikTok can terminate this license at any time for
                  any reason.
                  <br />
                  <br />
                  No licenses are granted for sound recordings and musical works
                  on the Service.
                  <br />
                  <br />
                  We do not have an obligation to pre-screen, monitor, or edit
                  content streamed by Avatars.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-user-content"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  13. User Content
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3">
                  <h4 className="text-[20px] font-semibold mb-4 sm:text-[15px]">
                    A. Content Contribution
                  </h4>
                  <p className="sm:text-[12px]">
                    Avatars on Avatar Walk can stream content such as text,
                    photos, videos, and music through the Services, including
                    collaborative content with other users. Users can also
                    record streams, graphics, stickers, and other elements
                    provided by Avatars.
                    <br />
                    <br />
                    Please be aware that the information and materials in User
                    Content have not been verified or approved by us. The views
                    expressed by other users on the Services do not represent
                    our views or values.
                    <br />
                    <br />
                    By submitting User Content, you grant Avatar Walk a license
                    to use, modify, adapt, and distribute your content. You also
                    allow us to use your user name, image, voice, and likeness
                    to identify you as the source of the content.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    B. Copyright and Ownership
                  </h4>
                  <p className="sm:text-[12px]">
                    You maintain the copyright to your User Content, but by
                    submitting it, you grant Avatar Walk a worldwide license to
                    use and distribute your content.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    C. Through-To-The-Audience Rights
                  </h4>
                  <p className="sm:text-[12px]">
                    The rights you grant for your User Content are provided on a
                    through-to-the-audience basis. Third-party services are not
                    liable to you for User Content posted via the Services.
                  </p>
                  <h4 className="text-[20px] font-semibold my-4 sm:text-[15px]">
                    D. Waiver of Rights
                  </h4>
                  <div className="sm:text-[12px]">
                    <ul
                      style={{
                        listStyle: "disc",
                        margin: "10px 0",
                        paddingLeft: "20px",
                      }}
                    >
                      <li>
                        By posting User Content, you waive rights to prior
                        inspection, privacy, publicity, and similar rights. You
                        also waive moral rights in connection with your User
                        Content.
                      </li>
                      <li>
                        We have the right to disclose your identity if your User
                        Content violates others' rights or privacy.
                      </li>
                      <li>
                        We may edit or remove content at our discretion. We do
                        not guarantee the accuracy, integrity, or quality of
                        User Content.
                      </li>
                      <li>
                        You control the privacy settings of your User Content.
                      </li>
                      <li>
                        If you find inappropriate content or have concerns, you
                        can report it.
                      </li>
                      <li>
                        Avatar Walk takes action against copyright
                        infringements.
                      </li>
                      <li>
                        We appreciate user feedback but are not obligated to
                        implement it. Any feedback is provided on a
                        non-confidential basis.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-indemnification"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  14. Indemnification
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  You agree to protect, defend, and hold harmless Avatar Walk,
                  its parent companies, subsidiaries, affiliates, and all their
                  respective officers, directors, employees, agents, and
                  advisors from any claims, liabilities, costs, and expenses,
                  including legal fees, resulting from a breach of these Terms
                  by you or any user of your account, or a violation of your
                  obligations and warranties under these Terms.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-no-warranties"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  15. No Warranties:
                </h2>
                <p className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  You have consumer rights that can't be waived, and these Terms
                  won't affect those rights.
                  <br />
                  <br />
                  Avatar Walk provides the Services "as is," and we don't make
                  any warranties. Specifically, we don't guarantee that:
                  <br />
                  <br />
                  The Services will meet all your needs. <br />
                  The Services will always be uninterrupted, timely, secure, or
                  error-free. <br />
                  Information you obtain from the Services will be accurate or
                  reliable. <br />
                  Any software provided as part of the Services will be free
                  from defects. <br />
                  These Terms only include the warranties expressly mentioned.
                  We may change or restrict our platform's availability at any
                  time for business or operational reasons without notice.
                </p>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="general-terms-limitation-of-liability"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  16. Limitation of Liability:
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  We're not liable for certain losses unless it's unlawful.
                  These exceptions include:
                  <ul
                    style={{
                      listStyle: "disc",
                      margin: "10px 0",
                      paddingLeft: "20px",
                    }}
                  >
                    <li>
                      Liability for death or personal injury resulting from our
                      negligence.
                    </li>
                    <li>
                      Liability for fraud or fraudulent misrepresentation.
                    </li>
                  </ul>
                  Subject to these exceptions, we won't be responsible for:
                  <ul
                    style={{
                      listStyle: "disc",
                      margin: "10px 0",
                      paddingLeft: "20px",
                    }}
                  >
                    <li>Lost profits, whether direct or indirect. </li>
                    <li> Lost goodwill. </li>
                    <li>Missed opportunities.</li>
                    <li>Data loss.</li>
                    <li>Indirect or consequential losses.</li>
                    <li>
                      Our maximum liability for other losses will be the amount
                      you paid us in the last 12 months.
                    </li>
                  </ul>
                  We won't be liable for:
                  <ul
                    style={{
                      listStyle: "disc",
                      margin: "10px 0",
                      paddingLeft: "20px",
                    }}
                  >
                    <li> Your reliance on streaming.</li>
                    <li> Changes to the platform.</li>
                    <li> Content deletion, corruption, or failure to store.</li>
                    <li> Inaccurate account information provided by you.</li>
                    <li>
                      Inadequate security of your password and account details.
                    </li>
                  </ul>
                  Our platform is for personal use, not commercial. We aren't
                  responsible for business-related losses.
                  <br />
                  <br />
                  These limitations apply regardless of whether we were aware of
                  the possibility of such losses.
                  <br />
                  <br />
                  You're responsible for mobile charges, including data and
                  text-messaging fees.
                  <br />
                  <br />
                  Any disputes with third parties arising from your platform use
                  are between you and the third party. You release us from any
                  claims connected to such disputes.
                </div>
              </div>
            </div>
            <div className="service-charges">
              <h5 className="term-heading font-semibold my-4 text-[18px]">
                Service Charges
              </h5>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="service-charges-fee-structure"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  1. Fee Structure
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  <ul
                    style={{
                      listStyle: "disc",
                      margin: "10px 0",
                      paddingLeft: "20px",
                    }}
                  >
                    <li>
                      AvatarWalk charges a service fee of 15% on the total
                      amount paid by the user for each requested virtual tour.
                    </li>
                    <li>
                      Additionally, Stripe payment processing fees of 2.9% +
                      $0.30 USD per transaction apply to all payments made
                      through the AvatarWalk platform.
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="service-charges-user-charges"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  2. User Charges
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  <ul
                    style={{
                      listStyle: "disc",
                      margin: "10px 0",
                      paddingLeft: "20px",
                    }}
                  >
                    <li>
                      When a user requests a virtual tour and makes a payment,
                      the total amount charged to the user will include the tour
                      package price plus the service fee and Stripe processing
                      fees.
                    </li>
                    <li>
                      The service fee of 15% and Stripe processing fees will be
                      deducted from the total amount paid by the user.
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="service-charges-avatar-charges"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  3. Avatar Charges
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  <ul
                    style={{
                      listStyle: "disc",
                      margin: "10px 0",
                      paddingLeft: "20px",
                    }}
                  >
                    <li>
                      Avatars offering virtual tours through the AvatarWalk
                      platform will receive 75% of the tour package price.
                    </li>
                    <li>
                      AvatarWalk deducts a service fee of 25% from the tour
                      package price before transferring the remaining amount to
                      the avatar.
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="service-charges-payment-processing"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  4. Payment Processing
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  <ul>
                    <li>
                      Payments made by users for virtual tours are processed
                      securely through Stripe, a third-party payment processor.
                      AvatarWalk is not responsible for any issues or disputes
                      related to Stripe's services.
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="service-charges-fee-transparency"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  5. Fee Transparency
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  <ul>
                    <li>
                      AvatarWalk will provide clear and transparent breakdowns
                      of all service fees and charges during the booking and
                      payment process. Users and avatars will be informed of the
                      total amount charged and the portion allocated to
                      AvatarWalk's service fees and payment processing fees.
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="single mb-[60px] scroll-mt-[20px] border border-slate-200"
                id="service-charges-changes-to-fee-structure"
              >
                <h2 className="text-[24px] font-semibold px-6 py-4 leading-none bg-black text-white sm:text-[18px] sm:px-4 sm:py-2 sm:leading-6">
                  6. Changes to Fee Structure
                </h2>
                <div className="py-8 px-6 sm:py-4 px-3 sm:text-[12px]">
                  <ul>
                    <li>
                      AvatarWalk reserves the right to modify its service fee
                      structure, including the percentage charged to users and
                      avatars, and the Stripe processing fees. Any changes to
                      the fee structure will be communicated to users and
                      avatars in advance.
                    </li>
                  </ul>
                  By using the AvatarWalk platform, users and avatars agree to
                  abide by these terms and conditions regarding service charges.
                  For any questions or concerns regarding service fees, users
                  and avatars may contact AvatarWalk's support team for
                  assistance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
