import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.state = {
      videos: window.exampleVideoData,
      currentVideo: window.exampleVideoData[0]
    };
  }
  componentDidMount() {
    this.getYouTubeVideos('cat videos');
  }
  getYouTubeVideos(query) {
    var options = {
      key: this.props.API_KEY,
      query: query,
    };
    this.props.searchYouTube(options, (videos) => {
      this.setState({
        videos: videos,
        currentVideo: videos[0]
      });
    });
  }
  
  
  handleClick(video) {
    this.setState({
      currentVideo: video,
    });
  }
  handleSearchChange(input) {
    this.getYouTubeVideos(input);
  }

  render() {
    return (<div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <div><h5><em>search</em><Search search={this.handleSearchChange}/></h5></div>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <div><h5><em>videoPlayer</em><VideoPlayer video={this.state.currentVideo}/></h5></div>
        </div>
        <div className="col-md-5">
          <div><h5><em>videoList</em><VideoList click={this.handleClick} videos={this.state.videos}/></h5></div>
        </div>
      </div>
    </div>
   )};

  onVideoListClick() {}
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
