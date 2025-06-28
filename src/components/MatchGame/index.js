import {Component} from 'react'
import Navbar from '../Navbar/index'
import WinOrLoseCard from '../WinOrLoseCard/index'

import './index.css'

class Matchgame extends Component {
  constructor(props) {
    super(props)
    const {imagesList} = props
    this.state = {
      isTrue: false,
      category: 'FRUIT',
      score: 0,
      time: 60,
      imgUrl: imagesList[0]?.imageUrl || '',
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.statusChange, 1000)
  }

  statusChange = () => {
    const {time} = this.state
    if (time !== 0) {
      this.setState(prevState => ({time: prevState.time - 1}))
    } else {
      clearInterval(this.timerId)
      this.setState({isTrue: true})
    }
  }

  clickTab = tabId => {
    this.setState({category: tabId})
  }

  imageClick = thumbnailUrl => {
    const {imgUrl} = this.state
    const {imagesList} = this.props
    const imageValue = imagesList.filter(
      eachValue => eachValue.thumbnailUrl === thumbnailUrl,
    )
    const {imageUrl} = imageValue[0]
    if (imageUrl === imgUrl) {
      const newImgUrl =
        imagesList[Math.floor(Math.random() * imagesList.length)].imageUrl
      console.log(newImgUrl)
      this.setState(prevState => ({
        score: prevState.score + 1,
        imgUrl: newImgUrl,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({isTrue: true})
    }
  }

  playAgain = () => {
    const {imagesList} = this.props

    this.setState({
      score: 0,
      imgUrl: imagesList[0].imageUrl,
      category: 'FRUIT',
      isTrue: false,
      time: 60,
    })
    this.timerId = setInterval(this.statusChange, 1000)
  }

  render() {
    const {isTrue, category, score, time, imgUrl} = this.state
    const {tabsList, imagesList} = this.props

    const thumbnailList = imagesList.filter(
      eachValue => eachValue.category === category,
    )

    return (
      <div className="main-container">
        <Navbar score={score} time={time} />
        <div className="content-div">
          {!isTrue && (
            <div className="first-div">
              <img src={imgUrl} className="big-image" alt="match" />
              <ul className="tab-elements">
                {tabsList.map(eachValue => (
                  <li key={eachValue.tabId}>
                    <button
                      type="button"
                      className={`tab-button ${
                        category === eachValue.tabId ? 'highlight-text' : ''
                      }`}
                      onClick={() => this.clickTab(eachValue.tabId)}
                    >
                      {eachValue.displayText}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className="thumbnail-images">
                {thumbnailList.map(eachObject => (
                  <li key={eachObject.id}>
                    <button
                      type="button"
                      className="image-button"
                      onClick={() => this.imageClick(eachObject.thumbnailUrl)}
                    >
                      <img
                        src={eachObject.thumbnailUrl}
                        className="thumbnail-image"
                        alt="thumbnail"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isTrue && <WinOrLoseCard score={score} playAgain={this.playAgain} />}
        </div>
      </div>
    )
  }
}

export default Matchgame
