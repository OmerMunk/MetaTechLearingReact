const Footer = (props) => {
    return (
        <>
            <footer className='footer card' style={{textAlign: 'center', fontSize:'20px'}}>
                <br/><br/><br/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                        <div style={{display: 'flex', flexDirection: 'column', width: '50%'}}>
                            <img src="PNG-Transparent.png" style={{width: '80%', display: 'flex', margin: 'auto'}}
                                 alt="logo of MetaTech"/>
                        </div>
                        <div style={{ fontSize: '24px', width: '50%'}}>
                            <ul style={{listStyle:'none'}}>
                                <li>
                                    <a onClick={props.contactClicked}>Carrers</a>
                                </li>
                                <li>
                                    <a onClick={props.contactClicked}>Contact Us</a>
                                </li>
                                <li>
                                    <a onClick={props.contactClicked}>Hey</a>
                                </li>
                                <li>
                                    <a onClick={props.contactClicked}>We Are Hiring</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <br/>
                    Built & Designed by Omer Munk and Ben Buaron.
                    <br/>
                    © 2022 by MetaTech. All rights reserved.
                    <br/>
                    <span style={{zIndex: '1'}}>
           <script id="godaddy-security-s" src="https://cdn.sucuri.net/badge/badge.js" data-s="2002"
                   data-i="31ca60fd7f811e00f8aea88fc35af039eaba8c08b9" data-p="o" data-c="l" data-t="g"/>
        </span>
                    <a href='https://www.freepik.com/vectors/business'>color vectors created by freepik
                        - www.freepik.com</a>

                </div>
            </footer>
        </>
    )
}
export default Footer