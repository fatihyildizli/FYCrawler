import React, { Component } from "react";
import "./index.css";
import axios from "axios";
import spider from "./spider.gif";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
} from "carbon-components-react/lib/components/UIShell";
import {
  TextInput,
  DangerButton,
  Tag,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  InlineLoading,
} from "carbon-components-react";
import FadeIn from "react-fade-in";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      data: [],
      error: false,
      results: [],
      actionType: "",
      loader: false,
      selectedAct: "",
      elapsedTimeVisiblity: false,
      specificWord: "",
    };
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.handleCrawlSubmit = this.handleCrawlSubmit.bind(this);
    this.handleHtmlTagsSubmit = this.handleHtmlTagsSubmit.bind(this);
    this.handleSpecificKeywordFreqSubmit = this.handleSpecificKeywordFreqSubmit.bind(
      this
    );
  }

  onChangeQuery = async (e) => {
    await this.setState({ query: e.target.value });
  };

  handleCrawlSubmit = () => {
    this.setState({ loader: true });

    var config = {
      headers: {
        "Content-Type": "text/plain",
      },
      responseType: "text",
    };

    axios
      .post(
        `https://spiderfy.herokuapp.com/${this.state.actionType}`,
        `http://${this.state.query}`,
        config
      )
      .then((res) => {
        const data = res.data;
        const results = res.data.results;
        this.setState({
          data,
          results,
          loader: false,
          elapsedTimeVisiblity: true,
        });
        console.log("data", data);
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  };

  handleSpecificKeywordFreqSubmit = () => {
    this.setState({ loader: true });

    const api_endpoint =
      `https://spiderfy.herokuapp.com/${this.state.actionType}?` +
      `${
        this.state.specificWord === ""
          ? `url=http://${decodeURI(this.state.query)}`
          : `keyword=${this.state.specificWord}&url=http://${decodeURI(
              this.state.query
            )}`
      }`;

    axios
      .get(api_endpoint)
      .then((res) => {
        const data = res.data;

        this.setState({
          data: data,
          results: [],
          loader: false,
          elapsedTimeVisiblity: true,
        });
        console.log("data", data);
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  };

  handleHtmlTagsSubmit = () => {
    this.setState({ loader: true });

    var config = {
      headers: {
        "Content-Type": "text/plain",
      },
      responseType: "text",
    };

    axios
      .post(
        `https://spiderfy.herokuapp.com/${this.state.actionType}`,
        `http://${this.state.query}`,
        config
      )
      .then((res) => {
        const data = res.data;

        this.setState({
          data: data,
          results: [],
          loader: false,
          elapsedTimeVisiblity: true,
        });
        console.log("data", data);
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  };

  render() {
    const {
      results,
      actionType,
      loader,
      selectedAct,
      elapsedTimeVisiblity,
      data,
    } = this.state;
    return (
      <div className="bx--grid">
        <Header aria-label="FYCrawler">
          <HeaderName prefix="🕸 FYCrawler 🕷">
            {selectedAct && (
              <Tag type="green">
                <span role="img" aria-label="icon">
                  🌐
                </span>
                Active Action:&nbsp;
                {selectedAct === ""
                  ? "Please select an action"
                  : selectedAct}{" "}
              </Tag>
            )}
            &nbsp;{" "}
            {elapsedTimeVisiblity && (
              <Tag type="red">
                <span role="img" aria-label="icon">
                  🖱
                </span>{" "}
                Elapsed Time:&nbsp;{data.elapsedTime}
              </Tag>
            )}
          </HeaderName>
          <HeaderNavigation aria-label="🕸 FYCrawler 🕷">
            <HeaderMenu aria-label="CRAWL" menuLinkName="🕸️ CRAWL">
              <HeaderMenuItem
                onClick={() =>
                  this.setState({
                    actionType: "crawl/",
                    selectedAct: "Crawl links",
                    results: [],
                    elapsedTimeVisiblity: false,
                  })
                }
              >
                <span role="img" aria-label="icon">
                  {" "}
                  🕸️
                </span>{" "}
                Crawl links
              </HeaderMenuItem>
              <HeaderMenuItem
                onClick={() =>
                  this.setState({
                    actionType: "crawl/images/",
                    selectedAct: "Crawl images",
                    results: [],
                    elapsedTimeVisiblity: false,
                  })
                }
              >
                <span role="img" aria-label="icon">
                  🕸️
                </span>{" "}
                Crawl images{" "}
              </HeaderMenuItem>
              <HeaderMenuItem
                onClick={() =>
                  this.setState({
                    actionType: "crawl/withthumbnail/",
                    selectedAct: "Crawl links with its Screenshoot",
                    results: [],
                    elapsedTimeVisiblity: false,
                  })
                }
              >
                <span role="img" aria-label="icon">
                  🕸️
                </span>{" "}
                Crawl with Screenshoot
              </HeaderMenuItem>
            </HeaderMenu>
            <HeaderMenu
              aria-label="SEO ANALYSIS"
              menuLinkName="🔖 SEO ANALYSIS"
            >
              <HeaderMenuItem
                onClick={() =>
                  this.setState({
                    actionType: "crawl/generateHtmlDetailSummary",
                    selectedAct: "Html Tags Detailed Usage",
                    results: [],
                    result: null,
                    elapsedTimeVisiblity: false,
                  })
                }
              >
                <span role="img" aria-label="icon">
                  🔖
                </span>{" "}
                HTML Detail Summary
              </HeaderMenuItem>
              <HeaderMenuItem
                onClick={() =>
                  this.setState({
                    actionType: "crawl/generateHtmlSummary/",
                    selectedAct: "Html Tags Usage",
                    results: [],
                    result: null,
                    elapsedTimeVisiblity: false,
                  })
                }
              >
                <span role="img" aria-label="icon">
                  🔖
                </span>{" "}
                HTML Tags Usage
              </HeaderMenuItem>
              <HeaderMenuItem
                onClick={() =>
                  this.setState({
                    actionType: "crawl/internalbacklinks/",
                    selectedAct: "Internal Backlinks",
                    results: [],
                    elapsedTimeVisiblity: false,
                  })
                }
              >
                <span role="img" aria-label="icon">
                  🔖
                </span>{" "}
                Internal Backlinks
              </HeaderMenuItem>
              <HeaderMenuItem
                onClick={() =>
                  this.setState({
                    actionType: "crawl/outgoingbacklinks/",
                    selectedAct: "Outgoing Backlinks",
                    results: [],
                    elapsedTimeVisiblity: false,
                  })
                }
              >
                <span role="img" aria-label="icon">
                  🔖
                </span>{" "}
                Outgoing Backlinks
              </HeaderMenuItem>
              <HeaderMenuItem
                onClick={() =>
                  this.setState({
                    actionType: "crawl/metatags/",
                    selectedAct: "Metatags",
                    results: [],
                    elapsedTimeVisiblity: false,
                  })
                }
              >
                <span role="img" aria-label="icon">
                  🔖
                </span>{" "}
                Metatags
              </HeaderMenuItem>
            </HeaderMenu>
            <HeaderMenu aria-label="💬NLP" menuLinkName="💬 NLP">
              <HeaderMenuItem
                onClick={() =>
                  this.setState({
                    actionType: "nlp/wordFrequency/",
                    selectedAct: "All Words Frequency",
                    results: [],
                    data: [],
                    elapsedTimeVisiblity: false,
                  })
                }
              >
                <span role="img" aria-label="icon">
                  💬
                </span>{" "}
                All Words Frequency
              </HeaderMenuItem>
              <HeaderMenuItem
                onClick={() =>
                  this.setState({
                    actionType: "nlp/specificWordFrequency",
                    selectedAct: "Specific Word Frequency",
                    results: [],
                    data: [],
                    elapsedTimeVisiblity: false,
                  })
                }
              >
                <span role="img" aria-label="icon">
                  💬
                </span>{" "}
                Specific Word Frequency
              </HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
        </Header>

        <div className="container" style={{ paddingTop: 100 }}>
          <div className="bx--row">
            <div class="bx--col"></div>
            <div class="bx--col-md-4">
              <TextInput
                id="query"
                labelText="Select an action and Type a website."
                placeholder="Type a website."
                onChange={(event) => this.onChangeQuery(event)}
              />
              {loader && (
                <div>
                  <InlineLoading
                    status="active"
                    style={{ flexFlow: "column", visibility: loader }}
                    description="Fetching.."
                  />
                  <img src={spider} width={100} />
                </div>
              )}
              <DangerButton
                onClick={() =>
                  actionType.toLowerCase().match("html")
                    ? this.handleHtmlTagsSubmit()
                    : this.handleCrawlSubmit() ||
                      actionType.toLowerCase().match("word")
                    ? this.handleSpecificKeywordFreqSubmit()
                    : this.handleCrawlSubmit()
                }
                style={{ float: "right", backgroundColor: "black" }}
              >
                Execute
              </DangerButton>
            </div>
            <div class="bx--col">
              <br />
            </div>
            <div class="bx--col" />
          </div>
        </div>

        {results.length > 0 && actionType === "crawl/withthumbnail/" && (
          <FadeIn>
            <StructuredListWrapper selection ariaLabel="Structured list">
              <StructuredListHead>
                <StructuredListRow head tabIndex={0}>
                  <StructuredListCell head>ScreenShoot</StructuredListCell>
                  <StructuredListCell head>
                    Url ({results.length})
                  </StructuredListCell>
                  <StructuredListCell head>Text</StructuredListCell>
                </StructuredListRow>
              </StructuredListHead>
              <StructuredListBody>
                {results.map((item, key) => (
                  <StructuredListRow tabIndex={key}>
                    <StructuredListCell>
                      <img
                        src={item.thumbnail}
                        target="_blank"
                        rel="noopener noreferrer"
                        alt={item.url}
                        width={150}
                        height={150}
                      />
                    </StructuredListCell>
                    <StructuredListCell>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        {item.link}
                      </a>
                    </StructuredListCell>
                    <StructuredListCell>{item.text}</StructuredListCell>
                  </StructuredListRow>
                ))}
              </StructuredListBody>
            </StructuredListWrapper>
          </FadeIn>
        )}

        {results.length > 0 && actionType === "crawl/" && (
          <FadeIn>
            <StructuredListWrapper selection ariaLabel="Structured list">
              <StructuredListHead>
                <StructuredListRow head tabIndex={0}>
                  <StructuredListCell head>
                    Url ({results.length})
                  </StructuredListCell>
                  <StructuredListCell head>Text</StructuredListCell>
                </StructuredListRow>
              </StructuredListHead>
              <StructuredListBody>
                {results.map((item, key) => (
                  <StructuredListRow tabIndex={key}>
                    <StructuredListCell>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        {item.link}
                      </a>
                    </StructuredListCell>
                    <StructuredListCell>{item.text}</StructuredListCell>
                  </StructuredListRow>
                ))}
              </StructuredListBody>
            </StructuredListWrapper>
          </FadeIn>
        )}

        {results.length > 0 && actionType === "crawl/internalbacklinks/" && (
          <FadeIn>
            <StructuredListWrapper selection ariaLabel="Structured list">
              <StructuredListHead>
                <StructuredListRow head tabIndex={0}>
                  <StructuredListCell head>
                    Url ({results.length})
                  </StructuredListCell>
                  <StructuredListCell head>Text</StructuredListCell>
                </StructuredListRow>
              </StructuredListHead>
              <StructuredListBody>
                {results.map((item, key) => (
                  <StructuredListRow tabIndex={key}>
                    <StructuredListCell>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        {item.link}
                      </a>
                    </StructuredListCell>
                    <StructuredListCell>{item.text}</StructuredListCell>
                  </StructuredListRow>
                ))}
              </StructuredListBody>
            </StructuredListWrapper>
          </FadeIn>
        )}

        {results.length > 0 && actionType === "crawl/outgoingbacklinks/" && (
          <FadeIn>
            <StructuredListWrapper selection ariaLabel="Structured list">
              <StructuredListHead>
                <StructuredListRow head tabIndex={0}>
                  <StructuredListCell head>
                    Url ({results.length})
                  </StructuredListCell>
                  <StructuredListCell head>Text</StructuredListCell>
                </StructuredListRow>
              </StructuredListHead>
              <StructuredListBody>
                {results.map((item, key) => (
                  <StructuredListRow tabIndex={key}>
                    <StructuredListCell>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        {item.link}
                      </a>
                    </StructuredListCell>
                    <StructuredListCell>{item.text}</StructuredListCell>
                  </StructuredListRow>
                ))}
              </StructuredListBody>
            </StructuredListWrapper>
          </FadeIn>
        )}
        {results.length > 0 && actionType === "crawl/images/" && (
          <FadeIn>
            <StructuredListWrapper selection ariaLabel="Structured list">
              <StructuredListHead>
                <StructuredListRow head tabIndex={0}>
                  <StructuredListCell head>
                    Image Thumbnail ({results.length})
                  </StructuredListCell>
                  <StructuredListCell head>Source</StructuredListCell>
                  <StructuredListCell head>Width (px)</StructuredListCell>
                  <StructuredListCell head>Height (px)</StructuredListCell>
                  <StructuredListCell head>Alt</StructuredListCell>
                </StructuredListRow>
              </StructuredListHead>
              <StructuredListBody>
                {results.map((item, key) => (
                  <StructuredListRow tabIndex={key}>
                    <StructuredListCell>
                      <img
                        src={item.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        alt={item.alt}
                        width={120}
                        height={120}
                      />
                    </StructuredListCell>
                    <StructuredListCell>
                      <a
                        href={item.src}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.src}
                      </a>
                    </StructuredListCell>
                    <StructuredListCell>{item.width}</StructuredListCell>
                    <StructuredListCell>{item.height}</StructuredListCell>
                    <StructuredListCell>{item.alt}</StructuredListCell>
                  </StructuredListRow>
                ))}
              </StructuredListBody>
            </StructuredListWrapper>
          </FadeIn>
        )}
        {results.length > 0 && actionType === "crawl/metatags/" && (
          <FadeIn>
            <StructuredListWrapper selection ariaLabel="Structured list">
              <StructuredListHead>
                <StructuredListRow head tabIndex={0}>
                  <StructuredListCell head>Name</StructuredListCell>
                  <StructuredListCell head>Property</StructuredListCell>
                  <StructuredListCell head>Content</StructuredListCell>
                </StructuredListRow>
              </StructuredListHead>
              <StructuredListBody>
                {results.map((item, key) => (
                  <StructuredListRow tabIndex={key}>
                    <StructuredListCell>{item.name}</StructuredListCell>
                    <StructuredListCell>{item.property}</StructuredListCell>
                    <StructuredListCell>{item.content}</StructuredListCell>
                  </StructuredListRow>
                ))}
              </StructuredListBody>
            </StructuredListWrapper>
          </FadeIn>
        )}
        {Object.keys(data).length !== 0 &&
          actionType === "crawl/generateHtmlSummary/" && (
            <FadeIn>
              <StructuredListWrapper selection ariaLabel="Structured list">
                <StructuredListHead>
                  <StructuredListRow head tabIndex={0}>
                    <StructuredListCell head>Html Tag</StructuredListCell>
                    <StructuredListCell head>Amount</StructuredListCell>
                  </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                  {Object.entries(data).map(([k, v]) => (
                    <StructuredListRow tabIndex={k}>
                      <StructuredListCell>{k}</StructuredListCell>
                      <StructuredListCell>{v}</StructuredListCell>
                    </StructuredListRow>
                  ))}
                </StructuredListBody>
              </StructuredListWrapper>
            </FadeIn>
          )}

        {actionType === "nlp/specificWordFrequency" && (
          <div class="bx--col">
            {" "}
            <TextInput
              id="specificWord"
              labelText="Enter a specific word"
              placeholder="Specific word"
              onChange={(event) =>
                this.setState({ specificWord: event.target.value })
              }
            />
            {this.state.data !== null && (
              <div class="bx--col">
                <br />
                <br />
                {`${this.state.data} times used.`}
              </div>
            )}
          </div>
        )}

        {Object.keys(data).length !== 0 && actionType === "nlp/wordFrequency/" && (
          <FadeIn>
            <StructuredListWrapper selection ariaLabel="Structured list">
              <StructuredListHead>
                <StructuredListRow head tabIndex={0}>
                  <StructuredListCell head>Word Phrase</StructuredListCell>
                  <StructuredListCell head>Amount</StructuredListCell>
                </StructuredListRow>
              </StructuredListHead>
              <StructuredListBody>
                {Object.entries(data).map(([k, v]) => (
                  <StructuredListRow tabIndex={k}>
                    <StructuredListCell>{k}</StructuredListCell>
                    <StructuredListCell>{v}</StructuredListCell>
                  </StructuredListRow>
                ))}
              </StructuredListBody>
            </StructuredListWrapper>
          </FadeIn>
        )}

        {Object.keys(data).length !== 0 &&
          actionType === "crawl/generateHtmlDetailSummary" && (
            <FadeIn>
              <StructuredListWrapper selection ariaLabel="Structured list">
                <StructuredListHead>
                  <StructuredListRow head tabIndex={0}>
                    <StructuredListCell head>Html Tag</StructuredListCell>
                    <StructuredListCell head>Value</StructuredListCell>
                  </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                  {Object.entries(data).map(([k, v]) => (
                    <StructuredListRow tabIndex={k}>
                      <StructuredListCell>{k}</StructuredListCell>
                      <StructuredListCell>{v}</StructuredListCell>
                    </StructuredListRow>
                  ))}
                </StructuredListBody>
              </StructuredListWrapper>
            </FadeIn>
          )}
      </div>
    );
  }
}

export default App;
