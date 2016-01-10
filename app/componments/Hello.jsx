var React = require('react');
var ReactDOM = require('react-dom');

// var TimeApp = React.createClass({
//     render:function(){
//         var elapsed = Math.round(this.props.elapsed / 100);
//         var second = elapsed / 10 + (elapsed % 10 ? '':'.0');

//         return (<p>
//                     this react app success {second}s
//                 </p>)
//     }
// })
// var startTime = new Date().getTime()
// setInterval(function(){
//     ReactDOM.render(<TimeApp elapsed={(new Date().getTime()) - startTime} />,
//         document.getElementById('hello'))
// },50);
class Hello extends React.Component {
    render(){
        return <div>Hello</div>
    }
}

ReactDOM.render(<Hello />,document.getElementById('root'));