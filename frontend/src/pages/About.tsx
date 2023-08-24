import TextHeader from "../components/TextHeader";

const About = () => {
    return ( 
        <main>
            {/* <PhotoHeader img={aboutImg} title="About Us"/> */}
            <TextHeader title="About Us"/>
            <p className="text-amber-300 text-xl my-8 mx-16 leading-10">
            Welcome to our innovative event listing website, where your event finds its perfect audience. Whether you're hosting a conference, workshop, concert, or any event imaginable, our platform simplifies the process for both organizers and attendees.
            <br/><br/>
            For Event Organizers:
            Listing your event is a breeze. Share all the essential details – date, time, location, and a captivating description. You can also include images or videos to truly showcase what participants can expect. Once your event is live, you can manage and edit its information with ease.
            <br/><br/>
            For Attendees:
            Discovering exciting events has never been simpler. Browse through an array of listings, filter by category or location, and find the events that align with your interests. Express your interest with a single click, and if plans change, you can easily manage your preferences.
            <br/><br/>
            Engagement and Interaction:
            Engage with event organizers and other participants through interactive features. Leave comments, ask questions, and get instant responses. If an event has caught your eye, marking your interest keeps you updated on any changes or announcements.
            <br/><br/>
            We believe that every event deserves the spotlight it needs, and every attendee should have the tools to tailor their event experience. Join us in making event management and attendance seamless, efficient, and enjoyable. Explore, engage, and enrich your event journey with us.
            </p>
        </main>
     );
}
 
export default About;