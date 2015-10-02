'use strict';

var App = React.createClass({

  getInitialState: function() {
    return {
      isEditOn: false
    };
  },

  toggleEdit: function() {
    this.setState({
      isEditOn: !this.state.isEditOn
    });
  },

  render: function() {
    return (
      <div className='app-wrapper'>
        <WorldTime
          cities={[{name: 'NYC', tz: 'America/New_York'}]}
          isEditOn={this.state.isEditOn}/>
        <button onClick={this.toggleEdit}>Edit</button>
      </div>
    );
  }

});

React.render(<App />, document.getElementById('content'));
