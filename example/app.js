'use strict';

var App = React.createClass({

  render: function() {
    return (
      <div className='app-wrapper'>
        <WorldClock
          cities={[{name: 'NYC', tz: 'America/New_York'}]}
        />
      </div>
    );
  }

});

React.render(<App />, document.getElementById('content'));
