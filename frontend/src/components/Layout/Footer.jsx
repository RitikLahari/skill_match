import React, { useContext } from 'react'
import {Context} from "../../main"
import {Link} from "react-router-dom"
import { FaGithub , FaLinkedin} from "react-icons/fa"
import { SiLeetcode } from "react-icons/si";
import { RiInstagramFill} from "react-icons/ri"
function Footer() {
  const {isAuthorized}  = useContext(Context)
  return (
    <footer className= {isAuthorized ? "footerShow" : "footerHide"}>
<div>&copy; All Rights Reserved by Ritik.</div>
<div>
  <Link to={'https://github.com/RitikLahari'} target='github'><FaGithub></FaGithub></Link>
  <Link to={'https://leetcode.com/u/ritik_lahari01/'} target='leetcode'><SiLeetcode></SiLeetcode></Link>
  <Link to={'https://in.linkedin.com/in/ritik-lahari-267213254'} target='linkedin'><FaLinkedin></FaLinkedin></Link>
  {/* <Link to={'https://www.instagram.com/exclusiveabhi/'} target='instagram'><RiInstagramFill></RiInstagramFill></Link> */}
</div>
      
    </footer>
  )
}

export default Footer