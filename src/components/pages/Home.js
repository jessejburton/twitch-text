import React, { useContext, useState, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { faCopy, faShareSquare } from '@fortawesome/free-solid-svg-icons'

import { serialize } from '../utilities/form'
import { useAuth0 } from "../../react-auth0-spa";
import { Form, FormBlock, MediumSpace } from '../styles'
import { Button, DotWave, Message } from '../ui'
import { Layout } from '../layout'
import {
  StyledContent,
  FullSection,
  FullPage
} from '../styles'

import { useQuery, useMutation } from 'react-apollo'
import { CREATE_TEXT, UPDATE_TEXT, GET_TEXTS } from '../../queries/text.queries'

const domain = window.location.port ?
  window.location.protocol + "//" + window.location.hostname + ":" + window.location.port :
  window.location.protocol + "//" + window.location.hostname

const Home = () => {

  /* Authentication */
  const { loading, isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  /* State */
  const [text, setText] = useState("")
  const [textData, setTextData] = useState([])
  const [message, setMessage] = useState(null)

  /* Context */
  const theme = useContext(ThemeContext);

  /* Queriers & Mutations */
  const { loading: dataLoading, refetch } = useQuery(GET_TEXTS, {
    variables: {
      email: ""
    }
  });
  const { loading: modsLoading, refetch: refetchMods } = useQuery(GET_TEXTS, {
    variables: {
      email: ""
    }
  });
  const [createText] = useMutation(CREATE_TEXT)
  const [updateText] = useMutation(UPDATE_TEXT)

  /* Functions */
  function addText() {
    createText({
      variables: {
        email: user.email,
        text
      }
    }).then(response => {
      displayTexts()
      setText("")
    })
  }

  function displayTexts() {
    refetch({
      email: user.email
    }).then(response => {
      setTextData(response.data.texts)
    })
  }

  function handleUpdateText(e) {
    e.preventDefault();
    var form = e.currentTarget;
    var data = serialize(form, true);

    updateText({
      variables: {
        id: data.id,
        text: data.text,
        color: data.color,
        size: data.size,
        font: data.font
      }
    }).then(response => {
      setMessage({
        type: "success",
        title: "Text Updated",
        text: `Your text should now read <strong>${data.text}</strong>`
      })
    })
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      displayTexts()
    }
  }, [user])

  if (loading || dataLoading) {
    return (
      <FullPage
        bgColor={theme.colors.background}
        color={theme.colors.font}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <DotWave />
      </FullPage>
    )
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <FullSection
          bgColor={theme.colors.background}
          color={theme.colors.font}>
          <StyledContent>
            <h1>Welcome</h1>
            <p><TextButtonLink hoverColor={theme.colors.primary} onClick={loginWithRedirect}>Login</TextButtonLink> or <TextButtonLink hoverColor={theme.colors.primary} onClick={loginWithRedirect}>Signup</TextButtonLink> to start creating text browser sources for your Twitch stream.</p>
          </StyledContent>
        </FullSection>
      </Layout>
    )
  }

  if (isAuthenticated) {
    return (
      <Layout>
        <FullSection
          bgColor={theme.colors.background}
          color={theme.colors.font}>
          <StyledContent>
            <h1>Welcome, {user.name}</h1>
            <p>Add some text · select a font · get the link for OBS!</p>
            <Form>
              <FormBlock>
                <h3>Add Text Source</h3>
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    value={text}
                    placeholder="Welcome to my stream!"
                    onChange={(e) => setText(e.target.value)} />
                  <Button
                    style={{ width: "100px", height: "auto" }}
                    onClick={(e) => { e.preventDefault(); addText() }}>
                    Add
                </Button>
                </div>
              </FormBlock>
            </Form>
            <MediumSpace>
              <StyledTexts>
                {textData &&
                  textData.map(text => {
                    let textURL = `${domain}/text/${text.id}`
                    return (
                      <form
                        className="text"
                        key={text.id}
                        onSubmit={handleUpdateText}>
                        <div className="text-inputs">
                          <div>
                            <input
                              name="text"
                              type="text"
                              className="text-input"
                              defaultValue={text.text} />
                          </div>
                          <div>
                            <select
                              name="font"
                              defaultValue={text.font}>
                              <option value="'Stacked Pixel', sans-serif">'Stacked Pixel', sans-serif</option>
                            </select>
                            <input
                              name="color"
                              type="text"
                              defaultValue={text.color} />
                            <input
                              name="size"
                              type="text"
                              defaultValue={text.size} />
                            <input
                              name="id"
                              type="hidden"
                              defaultValue={text.id} />
                          </div>
                        </div>
                        <div>
                          <Button
                            type="submit"
                            iconLeft={faShareSquare}>
                            Update
                          </Button>
                          <CopyToClipboard
                            text={textURL}
                            onCopy={() => setMessage({ title: "The following link has been copied to your clipboard.", text: textURL })}>
                            <Button
                              title="Click to copy the access code to your clipboard"
                              style={{ marginRight: "1rem" }}
                              onClick={(e) => e.preventDefault()}
                              iconLeft={faCopy}>
                              Copy URL
                            </Button>
                          </CopyToClipboard>
                        </div>
                      </form>
                    )
                  }
                  )
                }
              </StyledTexts>
            </MediumSpace>
            <MediumSpace>
              <FormBlock>
                <h4>Moderators</h4>
                <div style={{ display: "flex", margin: "2lrem 0" }}>
                  <input
                    style={{ maxWidth: "300px" }}
                    type="text"
                    placeholder="moderator email" />
                  <Button
                    style={{ height: "auto" }}>Add Moderator</Button>
                </div>
                {textData.moderators ?
                  (<p>{textData.moderators}</p>) :
                  (<p>no moderators</p>)
                }
              </FormBlock>
            </MediumSpace>
          </StyledContent>
        </FullSection>
        {message &&
          <Message
            toast
            dismiss={() => setMessage(null)}
            title={message.title || ""}
            type={message.type || "default"}>
            {message.text}
          </Message>
        }
      </Layout>
    )
  }
}
export default Home

const TextButtonLink = styled.button`
  display: inline-block;
  background-color: transparent;
  border: none;
  color: inherit;
  font-size: inherit;
  transition: all .3s ease;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: .3rem;
    bottom: -2px;
    left: 0;
    background-color: white;
    opacity: .3;
    transition: all .3s ease;
  }

  &:hover {
    color: ${props => props.hoverColor || "inherit"};

    &::after {
      height: .5rem;
      background-color: ${props => props.hoverColor || "white"};
    }
  }
`

const StyledTexts = styled.div`

  .text {
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2.5rem 0;
    background-color: #262629;
    padding: 1rem;

    .text-input {
      margin-bottom: 1rem;
      width: 100%;
    }

    .text-inputs {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      div {
        display: flex;
        justify-content: space-between;
      }

      input[type=text],
      select{
        background-color: #3A3A3C;
        border: 1px solid #3A3A3C;
        padding: 1.5rem 2rem;
        color: inherit;
        margin-right: 1rem;
      }

      input[type=text]:focus,
      select:focus {
        background-color: #18181B;
        border: 1px solid #6d35b8;
        outline: none;
      }
    }
  }


`

