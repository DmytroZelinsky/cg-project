import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FractalWindow from './FractalWindow/FractalWindow'
import ColorWindow from './ColorWindow/ColorWindow';
import TransformationWindow from './TransformationWindow/TransformationWindow';
import Home from './Home/Home';
import TheoryNav from './Theory/TheoryNav/TheoryNav';
import FractalTheory from './Theory/FractalTheory/FractalTheory';
import ColorTheory from './Theory/ColorTheory/ColorTheory';
import TransformationTheory from './Theory/TransformationTheory/TransformationTheory';
function App() {
  return (
  <>
    <Router>
      <Switch>
        <Route exact path='/fractal' component={FractalWindow}/>
        <Route exact path='/color' component={ColorWindow}/>
        <Route exact path='/transformation' component={TransformationWindow}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/' component={Home}/>
      </Switch>
      <Route path='/theory' component={TheoryNav}/>
      <Route exact path='/theory/fractal' component={FractalTheory}/>
      <Route exact path='/theory/color' component={ColorTheory}/>
      <Route exact path='/theory/transformation' component={TransformationTheory}/>

    </Router>
  </>
  )
}

export default App