import React, { useState } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


export default function App() {
  const [input, setInput] = useState('');
  const [imageURL, setImageURL] = useState('')
  const [boxes, setBoxes] = useState([])
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })

  const calculateRegions = (data) => {
    const regions = data.data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const dataRegions = regions.map((region) => {
      // Accessing and rounding the bounding box values
      const boundingBox = region.region_info.bounding_box;
      return {
        id: region.id,
        topRow: boundingBox.top_row * height,
        leftCol : boundingBox.left_col * width,
        bottomRow: height - (boundingBox.bottom_row * height),
        rightCol: width - (boundingBox.right_col * width)
      }
    });
    return dataRegions
  };

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    })
  };

  const displayFaceBox = (box) => {
    setBoxes(box)
  };

  const onInputChange = (e) => {
    setInput(e.target.value)
  };

  const onSubmit = () => {
    setImageURL(input)
      
    fetch('https://face-recognition-api-iucp.onrender.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          input: input
      })
    })
      .then(response => response.json())
      .then(result => displayFaceBox(calculateRegions(result)))
      .catch(err => console.log(err))

    fetch('https://face-recognition-api-iucp.onrender.com/image', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          id: user.id
      })
    })
      .then(response => response.json())
      .then(count => {
        setUser(prevState => {
          return {...prevState, entries: count}
        })
      })
      .catch(err => console.log(err))
  };
  const onRouteChange = (route) => {
    if (route === 'signin') {
      setIsSignedIn(false);
      setImageURL('');
      setInput('');
      setBoxes([]);
    } else if (route === 'home') {
      setIsSignedIn(true)
    }
    setRoute(route);
  };
  return (
    <div className="App">
      <ParticlesBg color="#2f1dd3" type="cobweb" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />

      { route === 'home'
        ? <>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm 
              onInputChange={onInputChange} 
              onSubmit={onSubmit}
            />
            <FaceRecognition boxes={boxes} imageURL={imageURL} />
          </>
        
        : (
          route === 'signin'
          ? <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
          : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        )
      }

    </div>
  );
}
    
// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       input: '',
//       imageURL: '',
//       boxes: [],
//       route: 'signin',
//       isSignedIn: false,

//     }
//   }

//   componentDidMount() {
//     fetch('http://localhost:3000/')
//       .then(response => response.json())
//       .then(console.log)
//   }

//   calculateRegions = (data) => {
//     const regions = data.outputs[0].data.regions;
//     const image = document.getElementById('inputImage');
//     const width = Number(image.width);
//     const height = Number(image.height);
//     const dataRegions = regions.map((region) => {
//       // Accessing and rounding the bounding box values
//       const boundingBox = region.region_info.bounding_box;
//       return {
//         id: region.id,
//         topRow: boundingBox.top_row * height,
//         leftCol : boundingBox.left_col * width,
//         bottomRow: height - (boundingBox.bottom_row * height),
//         rightCol: width - (boundingBox.right_col * width)
//       }
//     });
//     return dataRegions
//   };

//   displayFaceBox = (box) => {
//     this.setState({boxes: box});
//   }

//   onInputChange = (e) => {
//     this.setState({input: e.target.value});
//   }

//   onSubmit = () => {
//     this.setState({imageURL: this.state.input})
    
//     const MODEL_ID = 'face-detection';
//     const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';  

//     fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", returnClarifaiJSONRequest(this.state.input))
//       .then(response => response.json())
//       .then(result => this.displayFaceBox(this.calculateRegions(result)))
//       .catch(error => console.log('error', error));
//   }

//   onRouteChange = (route) => {
//     if (route === 'signout') {
//       this.setState({isSignedIn: false})
//     } else if (route === 'home') {
//       this.setState({isSignedIn: true})
//     }
//     this.setState({route: route});
//   }

//   render() {
//     return (
//       <div className="App">
//         <ParticlesBg color="#2f1dd3" type="cobweb" bg={true} />
//         <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />

//         { this.state.route === 'home'
//           ? <>
//               <Logo />
//               <Rank />
//               <ImageLinkForm 
//                 onInputChange={this.onInputChange} 
//                 onSubmit={this.onSubmit}
//               />
//               <FaceRecognition boxes={this.state.boxes} imageURL={this.state.imageURL} />
//             </>
          
//           : (
//             this.state.route === 'signin'
//             ? <Signin onRouteChange={this.onRouteChange} />
//             : <Register onRouteChange={this.onRouteChange} />
//           )
//         }

//       </div>
//     );
//   }
// }

// export default App;
