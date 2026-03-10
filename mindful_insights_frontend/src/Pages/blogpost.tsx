import React, { useEffect, useState, useContext } from "react";
import '../css/blog.css';
import { Box, IconButton, useTheme, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ColorModeContext, tokens } from "../theme";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

interface Research {
    topic: string;
    objective: string;
    startDate: string;
    abstract: string;
    areaOfResearch: string;
  }

const Blog: React.FC = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [researches, setResearches] = useState<Research[]>([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    const handleLogout = async () => { navigate('/login'); }

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/research/search?keyword=${keyword}`);
            setResearches(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <>
            <div className="container">
                <header className="border-bottom lh-1 py-3">
                    <div className="row flex-nowrap justify-content-between align-items-center">
                        <div className="col-4 pt-1">
                            <a className="link-secondary" href="#">Subscribe</a>
                        </div>
                        <div className="col-4 text-center">
                            <a className="blog-header-logo text-body-emphasis text-decoration-none" href="#">Large</a>
                        </div>
                        <div className="col-4 d-flex justify-content-end align-items-center">
                            <a className="link-secondary" href="#" aria-label="Search">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5" /><path d="M21 21l-5.2-5.2" /></svg>
                            </a>
                            <a className="btn btn-sm btn-outline-secondary" onClick={handleLogout}>Sign up</a>
                        </div>
                    </div>
                </header>
            </div>

            <div className="container">
                <div
                    className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary"
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/images/blog-bg.PNG'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        color: 'white'  // Adjust text color for better contrast
                    }}
                >
                    <div className="col-lg-6 px-0">
                        <h1 className="display-4"><b>mindful INSIGHTS</b></h1>
                        <p className="lead my-3">Welcome to Mindful Insights, <b>advancing mental health research with data-driven insights</b></p>
                        <button type="button" className="btn btn-lg" style={{ backgroundColor: "#f8be0098" }}>Get started</button>
                    </div>
                </div>
                <div className="mb-4 rounded" style={{ width: "100%" }}>
                    <Box display="flex" justifyContent="space-between" p={1}
                        sx={{
                            display: "flex",
                            borderRadius: "3px",
                            backgroundColor: colors.primary[400],
                            width: "100%",
                        }}
                    >
                        <InputBase
                            sx={{ ml: 2, flex: 1 }}
                            placeholder="Search key words"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </Box>
                </div>
                <div className="row mb-2">
                    {researches.map((research, index) => (
                        <div className="col-md-6" key={index}>
                            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                <div className="col p-4 d-flex flex-column position-static">
                                    <strong className="d-inline-block mb-2 text-primary-emphasis">{research.areaOfResearch}</strong>
                                    <h3 className="mb-0">{research.topic}</h3>
                                    <div className="mb-1 text-body-secondary">{new Date(research.startDate).toLocaleDateString()}</div>
                                    <p className="card-text mb-auto">{research.abstract}</p>
                                    <a href="#" className="icon-link gap-1 icon-link-hover stretched-link">
                                        Continue reading
                                        <svg className="bi"><use xlinkHref="#chevron-right" /></svg>
                                    </a>
                                </div>
                                <div className="col-auto d-none d-lg-block">
                                <img className="thumbnail-img" src={process.env.PUBLIC_URL + '/assets/images/collab-bg.PNG'} alt="Image" style={{ height: '420px', width: '250px' }}/>   
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row g-5">
                    <div className="col-md-8">
                        <h3 className="pb-4 mb-4 fst-italic border-bottom">
                            From the Firehose
                        </h3>
                        <article className="blog-post">
                            <h2 className="display-5 link-body-emphasis mb-1">Sample blog post</h2>
                            <p className="blog-post-meta">January 1, 2021 by <a href="#">Mark</a></p>
                            <p>This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic typography, lists, tables, images, code, and more are all supported as expected.</p>
                            <hr />
                            <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
                            <h2>Blockquotes</h2>
                            <p>This is an example blockquote in action:</p>
                            <blockquote className="blockquote">
                                <p>Quoted text goes here.</p>
                            </blockquote>
                            <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
                            <h3>Example lists</h3>
                            <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout. This is an example unordered list:</p>
                            <ul>
                                <li>First list item</li>
                                <li>Second list item with a longer description</li>
                                <li>Third list item to close it out</li>
                            </ul>
                            <p>And this is an ordered list:</p>
                            <ol>
                                <li>First list item</li>
                                <li>Second list item with a longer description</li>
                                <li>Third list item to close it out</li>
                            </ol>
                            <p>And this is a definition list:</p>
                            <dl>
                                <dt>HyperText Markup Language (HTML)</dt>
                                <dd>The language used to describe and define the content of a Web page</dd>
                                <dt>Cascading Style Sheets (CSS)</dt>
                                <dd>Used to describe the appearance of Web content</dd>
                                <dt>JavaScript (JS)</dt>
                                <dd>The programming language used to build advanced Web sites and applications</dd>
                            </dl>
                            <h2>Inline HTML elements</h2>
                            <p>HTML defines a long list of available inline tags, a complete list of which can be found on the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element">Mozilla Developer Network</a>.</p>
                            <ul>
                                <li><strong>To bold text</strong>, use <code className="language-plaintext highlighter-rouge">&lt;strong&gt;</code>.</li>
                                <li><em>To italicize text</em>, use <code className="language-plaintext highlighter-rouge">&lt;em&gt;</code>.</li>
                                <li>Abbreviations, like <abbr title="HyperText Markup Langage">HTML</abbr> should use <code className="language-plaintext highlighter-rouge">&lt;abbr&gt;</code>, with an optional <code className="language-plaintext highlighter-rouge">title</code> attribute for the full phrase.</li>
                                <li>Citations, like <cite>— Mark Otto</cite>, should use <code className="language-plaintext highlighter-rouge">&lt;cite&gt;</code>.</li>
                                <li><del>Deleted</del> text should use <code className="language-plaintext highlighter-rouge">&lt;del&gt;</code> and <ins>inserted</ins> text should use <code className="language-plaintext highlighter-rouge">&lt;ins&gt;</code>.</li>
                                <li>Superscript <sup>text</sup> uses <code className="language-plaintext highlighter-rouge">&lt;sup&gt;</code> and subscript <sub>text</sub> uses <code className="language-plaintext highlighter-rouge">&lt;sub&gt;</code>.</li>
                            </ul>
                            <p>Most of these elements are styled by browsers with few modifications on our part.</p>
                            <h2>Heading</h2>
                            <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
                            <h3>Sub-heading</h3>
                            <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
                            <pre><code>Example code block</code></pre>
                            <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout. This is an example unordered list:</p>
                            <ul>
                                <li>First list item</li>
                                <li>Second list item with a longer description</li>
                                <li>Third list item to close it out</li>
                            </ul>
                            <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout. This is an example ordered list:</p>
                            <ol>
                                <li>First list item</li>
                                <li>Second list item with a longer description</li>
                                <li>Third list item to close it out</li>
                            </ol>
                            <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout. This is an example unordered list:</p>
                            <ul>
                                <li>First list item</li>
                                <li>Second list item with a longer description</li>
                                <li>Third list item to close it out</li>
                            </ul>
                        </article>
                    </div>
                    <div className="col-md-4">
                        <div className="position-sticky" style={{ top: "2rem" }}>
                            <div className="p-4 mb-3 bg-body-tertiary rounded">
                                <h4 className="fst-italic">About</h4>
                                <p className="mb-0">Customize this section to tell your visitors a little bit about your publication, writers, content, or something else entirely. Totally up to you.</p>
                            </div>
                            <div className="p-4">
                                <h4 className="fst-italic">Archives</h4>
                                <ol className="list-unstyled mb-0">
                                    <li><a href="#">March 2021</a></li>
                                    <li><a href="#">February 2021</a></li>
                                    <li><a href="#">January 2021</a></li>
                                    <li><a href="#">December 2020</a></li>
                                    <li><a href="#">November 2020</a></li>
                                    <li><a href="#">October 2020</a></li>
                                    <li><a href="#">September 2020</a></li>
                                    <li><a href="#">August 2020</a></li>
                                    <li><a href="#">July 2020</a></li>
                                    <li><a href="#">June 2020</a></li>
                                    <li><a href="#">May 2020</a></li>
                                    <li><a href="#">April 2020</a></li>
                                </ol>
                            </div>
                            <div className="p-4">
                                <h4 className="fst-italic">Elsewhere</h4>
                                <ol className="list-unstyled">
                                    <li><a href="#">GitHub</a></li>
                                    <li><a href="#">Twitter</a></li>
                                    <li><a href="#">Facebook</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;
