# Renosis

<img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/307/157/datas/gallery.jpg" alt="drawing" width="600"/>

## Inspiration

Despite modern technology continuing to advance, socioeconomic disparity between classes increases and more and more people are left behind without access to new innovations. Even in first world countries, this remains the case. Many of these people are located in deep rural areas, where the role of technology has not been kept up to date.

Since the pandemic, the need for technology, and especially medical attention, has only become more vital. Most importantly, virtual appointments and diagnoses have increased by 30 percent. To accommodate this influx of telemedicine - especially with regards to those located rurally - we decided to create a platform for people to receive specialized diagnoses, no matter how far away they are from a medical professional.

## What it does

Renosis connects people to medical professionals, nurses, or skilled practitioners who can give treatment plans and diagnoses virtually. The patient can submit a video or a text description to relay their symptoms. Renosis will help doctors and patients schedule interactions based on patients’ needs and doctor availability. There is also an option for live, secure video conferencing for these interactions.

Users, both as patients and doctors can sign up for an account. Patients have the ability to see the timeline of past, present, and future appointments on a calendar, schedule new appointments, and view the history of previous visits such as notes and reason for visit. Doctors can schedule appointments and use this to create appointments with patients.

Renosis also gives patients a way to easily centralize and access their EMR (electronic medical record) wherever they go. Instead of asking patients to fill out forms for access to their medical history, patients can upload their EMR(s) and all other required/related documents so that the process is almost instantaneous for the physician.

## How we built it

### Technologies

JavaScript, React, Firebase, Firebase Authentication, Cloud Firestore, Cohere, Tailwind CSS, Ant Design, Express JS, Twilio

### Timeline

We built Renosis through first generating a react application and then installing required libraries like Ant Design and Tailwind CSS. From there we set up authentication and our data-base schema on Firebase Firestore and created a plan for patient and doctor data-screens. From here, we developed the patient and doctor data-screens and populated information through our React Form that populated directly to Firestore.

## Challenges We Ran Into

With the very open-ended prompts, we were overwhelmed by the vast selection of ideas. After weighing the pros and cons, we decided the idea behind Renosis was both the best idea and the issue we were most passionate about. The biggest challenge was trying to do everything we had planned in the allotted time, as it was **much** easier to frame our project than actually program it.

Besides time, here were some of the questions and challenges we ran into:

-   How would we differentiate between patients and licensed medical professionals during the sign up procedure
-   Seamlessly implementing the live-video feature through WebRTC within the time frame
-   Not looking in to _all_ features of everything we wanted to incorporate to our program (ex: we had done the authenticating and storing of people who sign up but towards the end when we believed we were ready to incorporate Twilio’s SMS features, we realized we needed the user’s phone number if we wanted to incorporate Twilio, resulting in us ending up not using it again cause of the time)

## Accomplishments we're proud of

Most importantly, we’re beyond happy and proud of ourselves to have been able to (in our opinion) create a well-rounded product in our team’s first hackathon, with everyone contributing despite the wide spread of programming skills. Implementing Firebase and properly authenticating the steps was a big hurdle which we successfully crossed.

## What we learned

For all members, even for conceptualizing, we all had to know the functionality and of Firebase, WebRTC, Tailwind CSS, and Ant Design. We also learned each other’s strengths and weaknesses, making it much more easier for us to work efficiently in our future hackathons and other events.

For less experienced members, they were able to experience the joy of learning and using new technologies, frameworks, languages (such as React JSX and Ant Design), etc. and able to learn vital skills for programming, such as how to use GitHub and learn the development process.

For more experienced members, they learned how to use Firebase for serverless functions. structuring back-end data in a easily parsable and readable format since the code would be viewed by others, and how to lead the team and get all members participating in any way that they could.

## What's next for Renosis

-   Attract a base of medical professionals to treat virtual patients
-   Implement WebRTC and Cohere as planned
-   Provide patients and medical professionals easy access to EMR’s while following HIPAA guidelines (ex: Renosis staff can’t access user’s EMR)
-   Build a functional mobile version to further increase accessibility
-   Increase authentication levels to ensure proper compliance in regards to HIPAA guidelines
-   Follow-up system so patients don’t ghost a medical professional’s response
-   Detect spam/joke submissions
-   Sentiment analysis to prioritize patients
-   Have the calendar pull data from Firebase and use existing information to cleanly schedule and display upcoming and past appointments
-   Continue to improve the “cover of the book,” UX/UI design, and other front-end features to make the website _incredibly_ appealing
