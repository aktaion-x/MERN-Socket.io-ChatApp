import './About.css';

const About = () => {
  return (
    <div className="About">
      <div className="header">
        <h1>About ChatApp</h1>
        <p>Welcome to ChatApp, a real-time chat application built using the MERN stack and Socket.io. This project showcases my expertise in web development and demonstrates my ability to create dynamic, interactive, and secure applications.</p>
      </div>
      <div className="features">
        <h2>Key Features</h2>
        <ul>
          <li>
            <h4>Real-Time Communication</h4>
            <span>ChatApp leverages the power of Socket.io, a JavaScript library for real-time web applications, to facilitate instant messaging between users. The application ensures that messages are delivered and received in real-time, allowing for seamless and uninterrupted conversations.</span>
          </li>
          <li>
            <h4>Secure Authentication</h4>
            <span>ChatATo guarantee the security of user interactions, ChatApp employs JSON Web Tokens (JWT) for authentication. This ensures that only authorized users can access the application and engage in chat conversations, protecting user privacy and preventing unauthorized access.</span>
          </li>
          <li>
            <h4>Responsive Design</h4>
            <span>
              ChatApp is designed with a responsive layout, allowing users to access the application from various devices, including desktops, laptops, tablets, and smartphones. The user interface adapts seamlessly to different screen sizes, providing an optimal viewing and interaction experience
              across devices.
            </span>
          </li>
        </ul>
      </div>
      <div className="technologies">
        <h2>Technologies Used</h2>
        <ul>
          <li>
            <h4>React</h4>
          </li>
          <li>
            <h4>ExpressJS</h4>
          </li>
          <li>
            <h4>Socket.io</h4>
          </li>
          <li>
            <h4>ViteJS</h4>
          </li>
          <li>
            <h4>React Router</h4>
          </li>
          <li>
            <h4>Node.js</h4>
          </li>
          <li>
            <h4>Mongoose</h4>
          </li>
          <li>
            <h4>MongoDB</h4>
          </li>
        </ul>
      </div>
      <div className="conclusion">
        <h2>Conclusion</h2>
        <p>ChatApp represents my expertise in full-stack web development and showcases my ability to create real-time applications using the MERN stack and Socket.io. With its modern design, and secure authentication</p>
      </div>
    </div>
  );
};

export default About;
