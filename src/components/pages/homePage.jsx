import React, { Component } from "react";
import Navigation from "../templates/navigation";
import LoginNav from "../templates/loginNav";
import Plx from "react-plx";

import {
  parallaxContainer1Banner1,
  parallaxContainer1Banner2,
  parallaxContainer3,
  parallaxContainer3Text1,
  parallaxContainer3Text2,
  parallaxContainer3Text3,
  parallaxContainer4Banner1Group1Text1,
  parallaxContainer4Banner1Group1Text2,
  parallaxContainer4Banner1Group2Text1,
  parallaxContainer4Banner1Group2Text2,
  parallaxContainer4Banner1Group3Text1,
  parallaxContainer4Banner1Group3Text2,
  parallaxContainer5,
  parallaxContainer5Banner1Text1,
  parallaxContainer5Banner1Text2,
  parallaxContainer5Banner1Text3
} from "../../lib/homePagePlxData";

const HomePage = () => (
  <div id="app-container">
    <div className="fixed">
      <div className="row navigation">
        <div className="col-md-">
          <Navigation />
        </div>
        <div className=".col-sm-">
          <LoginNav />
        </div>
      </div>
    </div>
    <div id="home" className="row justify-content-md-center">
      <div className="wrapper">
        <div className="container-1">
          <Plx
            className="parallaxContainer1Banner1"
            parallaxData={parallaxContainer1Banner1}
          >
            <div className="banner-1">
              <div className="new">
                <h4>A new way to buy cars!</h4>
              </div>
              <div className="join">
                <div className="para-1">
                  <h5>Car-App</h5>
                  <p>Revolutionising how you get used car bagains.</p>
                </div>
                <div className="para-2">
                  <h5>
                    <a href="/signup">Sign Up Now!</a>
                  </h5>
                  <p> </p>
                </div>
              </div>
            </div>
          </Plx>

          <div className="banner-2">
            <div className="video">
              <Plx
                className="parallaxContainer1Banner2"
                parallaxData={parallaxContainer1Banner2}
              >
                <video className="videoTag" autoPlay loop muted>
                  <source
                    src="https://14-lvl3-pdl.vimeocdn.com/01/4228/4/121142413/342125205.mp4?expires=1542726023&token=0da20e74bde9b1cca4827"
                    type="video/mp4"
                  />
                  <source
                    src="https://14-lvl3-pdl.vimeocdn.com/01/4228/4/121142413/342125205.mp4?expires=1542726023&token=0da20e74bde9b1cca4827"
                    type="video/ogg"
                  />
                </video>
              </Plx>
            </div>
          </div>
        </div>

        <div className="container-2">
          <div className="banner-1">
            <div className="visual-wrapper">
              <div className="visual">
                <video className="videoTag" autoPlay loop muted>
                  <source
                    src="https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/736/10/253684552/924824809.mp4?token=1542727221-0xa809a98191453ba71ccbda69bbaeccecfdcbb893"
                    type="video/mp4"
                  />
                  <source
                    src="https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/736/10/253684552/924824809.mp4?token=1542727221-0xa809a98191453ba71ccbda69bbaeccecfdcbb893"
                    type="video/ogg"
                  />
                </video>
              </div>
            </div>
          </div>
          <div className="banner-2">
            <div className="text-wrapper">
              <div className="text">
                <div className="column">
                  <h3>
                    Stop laboriously looking at multiple websites, and do it all
                    in one.
                  </h3>
                </div>
              </div>
            </div>
            <div className="text-wrapper">
              <div className="text">
                <div className="column">
                  <h3>
                    Using our intelligent AI, you will receive updates on the
                    best deals online.
                  </h3>
                </div>
              </div>
            </div>
            <div className="text-wrapper">
              <div className="text">
                <div className="column">
                  <h3>When all is said and done, buy your next dream car.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-3">
          <Plx className="parallaxContainer3" parallaxData={parallaxContainer3}>
            <div className="text-wrapper">
              <Plx
                className="parallaxContainer3Text1"
                parallaxData={parallaxContainer3Text1}
              >
                <div className="text-1">Search.</div>
              </Plx>
              <Plx
                className="parallaxContainer3Text2"
                parallaxData={parallaxContainer3Text2}
              >
                <div className="text-2">Review.</div>
              </Plx>
              <Plx
                className="parallaxContainer3Text3"
                parallaxData={parallaxContainer3Text3}
              >
                <div className="text-3">Buy.</div>
              </Plx>
            </div>
          </Plx>
        </div>

        <div className="container-4">
          <div className="banner-wrapper">
            <div className="banner-1">
              <div className="text-1-positioning">
                <Plx
                  className="parallaxContainer4Banner1Group1Text1"
                  parallaxData={parallaxContainer4Banner1Group1Text1}
                  style={{ visibility: "visible" }}
                >
                  <div className="text-1">Awesome</div>
                </Plx>
              </div>
              <Plx
                className="parallaxContainer4Banner1Group1Text2"
                parallaxData={parallaxContainer4Banner1Group1Text2}
                style={{ visibility: "visible" }}
              >
                <div className="text-2">
                  "This app have saved me countless hours looking for the best
                  deal. Thanks!"
                </div>
              </Plx>

              <div className="text-1-positioning">
                <Plx
                  className="parallaxContainer4Banner1Group2Text1"
                  parallaxData={parallaxContainer4Banner1Group2Text1}
                  style={{ visibility: "visible" }}
                >
                  <div className="text-1">Bargain</div>
                </Plx>
              </div>
              <Plx
                className="parallaxContainer4Banner1Group2Text2"
                parallaxData={parallaxContainer4Banner1Group2Text2}
                style={{ visibility: "visible" }}
              >
                <div className="text-2">
                  "I managed to pick up my dream car without doing anything at
                  all."
                </div>
              </Plx>

              <div className="text-1-positioning">
                <Plx
                  className="parallaxContainer4Banner1Group3Text1"
                  parallaxData={parallaxContainer4Banner1Group3Text1}
                  style={{ visibility: "visible" }}
                >
                  <div className="text-1">Easy</div>
                </Plx>
              </div>
              <Plx
                className="parallaxContainer4Banner1Group3Text2"
                parallaxData={parallaxContainer4Banner1Group3Text2}
                style={{ visibility: "visible" }}
              >
                <div className="text-2">
                  "With only a few clicks, I managed to get the best cars
                  straight into my email on a daily basis."
                </div>
              </Plx>
              <div className="overlay" />
            </div>
            <div className="banner-2">
              <div className="visual-wrapper">
                <div className="visual-1">Visual 1</div>
                <div className="visual-2">Visual 2</div>
                <div className="visual-3">Visual 3</div>
              </div>
            </div>
          </div>
        </div>

        <Plx
          className="parallaxContainer5"
          parallaxData={parallaxContainer5}
          style={{ visibility: "visible" }}
        >
          <div className="container-5">
            <div className="banner-1">
              <div className="wrapper">
                <div className="text-wrapper">
                  <Plx
                    className="parallaxContainer5Banner1Text1"
                    parallaxData={parallaxContainer5Banner1Text1}
                    style={{ visibility: "visible" }}
                  >
                    <div className="text-1">Dream.</div>
                  </Plx>
                  <Plx
                    className="parallaxContainer5Banner1Text2"
                    parallaxData={parallaxContainer5Banner1Text2}
                    style={{ visibility: "visible" }}
                  >
                    <div className="text-2">Plan.</div>
                  </Plx>
                  <Plx
                    className="parallaxContainer5Banner1Text3"
                    parallaxData={parallaxContainer5Banner1Text3}
                    style={{ visibility: "visible" }}
                  >
                    <div className="text-3">Start.</div>
                  </Plx>
                </div>
              </div>
            </div>
            <div className="banner-2">
              <div className="visual-1">
                <div className="content">
                  <h3>Dream your next great drive, and make it a reality.</h3>
                </div>
              </div>
              <div className="visual-2">
                <div className="content">
                  <h3>
                    Plan on what makes and models you want, and the price range
                    to suit you.
                  </h3>
                </div>
              </div>
              <div className="visual-3">
                <div className="content">
                  <h3>Sign up and get started.</h3>
                </div>
              </div>
            </div>
          </div>
        </Plx>
      </div>
    </div>
  </div>
);

export default HomePage;
