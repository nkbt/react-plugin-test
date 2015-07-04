import React from 'react';


const SafePlugin = React.createClass({
  propTypes: {
    onRender: React.PropTypes.func
  },


  render() {
    this.props.onRender();
    return (
      <div style={{minHeight: 300, background: 'rgba(0, 0, 255, 0.2)'}}>
        <h2>I am Safe Plugin</h2>
      </div>
    );
  }
});


const BrokenPlugin = React.createClass({
  propTypes: {
    onRender: React.PropTypes.func
  },


  render() {
    this.props.onRender();
    throw new Error('OMG! I am broken');
  }
});


const App = React.createClass({
  getInitialState() {
    return {clicks: 0, error: ''};
  },


  componentWillMount() {
    this.renderCounter = 0;
    this.safeCounter = 0;
    this.brokenCounter = 0;
    this.wrapper = document.createElement('div');
    try {
      this.SafePlugin = React.render(
        <SafePlugin
          onRender={() => this.safeCounter = this.safeCounter + 1} />, this.wrapper);
    } catch (e) {
      // empty
    }
    try {
      this.BrokenPlugin = React.render(
        <BrokenPlugin
          onRender={() => this.brokenCounter = this.brokenCounter + 1} />, this.wrapper);
    } catch (e) {
      this.setState({error: e.message});
      // empty
    }
  },


  componentDidMount() {
    if (this.SafePlugin) {
      React.findDOMNode(this.refs.safeContainer).appendChild(this.wrapper);
    }
    if (this.BrokenPlugin) {
      React.findDOMNode(this.refs.brokenCounter).appendChild(this.wrapper);
    }
  },


  render() {
    this.renderCounter = this.renderCounter + 1;

    return (
      <div>
        <h1>Plugins Container</h1>
        <p>Clicks count: {this.state.clicks}</p>
        <p>App render count: {this.renderCounter}</p>
        <button onClick={() => this.setState({clicks: this.state.clicks + 1})}>Click me!</button>

        <p>Safe Plugin render count: {this.safeCounter}</p>
        <div ref="safeContainer"></div>

        <p>Broken Plugin render count: {this.brokenCounter}</p>
        <div ref="brokenContainer"></div>

        <p style={{color: 'red'}}>{this.state.error}</p>

      </div>
    );
  }
});

React.render(<App />, document.body);
