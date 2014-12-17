var React = require('react');
var cx = require('react/lib/cx');
var foundationApi = require('./utils/foundation-api');
var Animation = require('./utils/animation');

var NotificationStatic = React.createClass({
  getInitialState: function () {
    return { open: false };
  },
  getDefaultProps: function () {
    return {
      position: 'top-right',
      color: 'success',
      title: null,
      image: null,
      content: null
    };
  },
  componentDidMount: function () {
    foundationApi.subscribe(this.props.id, function (name, msg) {
      if (msg === 'open') {
        this.setState({open: true});
      } else if (msg === 'close') {
        this.setState({open: false});
      }
    }.bind(this)); 
  },
  componentWillUnmount: function () {
    foundationApi.unsubscribe(this.props.id);
  },
  closeHandler: function (e) {
    this.setState({open: false});
    e.preventDefault();
    e.stopPropagation();
  },
  render: function () {
    var classes = { 
      notification: true,
      // 'is-active': this.state.open
    };
    classes[this.props.position] = true;
    classes[this.props.color] = true;
    var imageNode = null;
    if (this.props.image) {
      imageNode = (
        <div className="notification-icon">
          <img src="{{ image }}" />
        </div>
      );
    }
    return (
      <Animation active={this.state.open} animationIn="fadeIn" animationOut="fadeOut">
        <div id={this.props.id} data-closable={true} className={cx(classes)}>
          <a href="#" className="close-button" onClick={this.closeHandler}>&times;</a>
          {imageNode}
          <div className="notification-content">
            <h1>{this.props.title}</h1>
            <p>{this.props.children}</p>
          </div>
        </div>
      </Animation>
    );
  }
});

module.exports = NotificationStatic;