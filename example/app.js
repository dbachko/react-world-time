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
          cities={[{
            name: 'New York City',
            tz: 'America/New_York',
            geopoint: {
              lat: 40.71427,
              lon: -74.00597
            }
          }]}
          isEditOn={this.state.isEditOn}/>
        <button onClick={this.toggleEdit}>Edit</button>
      </div>
    );
  }

});

ReactDOM.render(<App />, document.getElementById('content'));
