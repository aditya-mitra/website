import React from 'react'

import styled from '@emotion/styled'
import ArrowDown from '../resources/arrow-down.svg'
import { colors, shadows, sizes } from '../styles/variables'
import { Link } from 'gatsby'
import ExternalLink from '../components/ExternalLink'

const StyledDropDown = styled.div`
    z-index: 900;

    @media(min-width: calc(${sizes.breakpoints.lg} + 1px)) {
        position: relative;
    }

    button {
        cursor: pointer;
        display: flex;
        align-items: center;
        border: none;
        max-width: 20rem;

        &:hover,
        &:focus {
            color: ${colors.lightBlue};

            &::before {
                right: 0;
                border-color: ${colors.lightBlue};
            }
        }
    }

    .arrow {
        height: .8rem;
        margin-left: 1rem;
        @media(max-width: ${sizes.breakpoints.lg}) {
            height: 1rem;
        }

        @media(min-width: calc(${sizes.breakpoints.lg} + 1px)) {
            display: none;
        }
    }

    ul {
        display: flex;
        flex-direction: column;

        @media(min-width: calc(${sizes.breakpoints.lg} + 1px)) {
            position: absolute;
            top: 2.5rem;
            left: 7%;
            width: 120%;
            left: 50%;
            transform: translateX(-50%);
            min-width: 14rem;
            padding: .5rem 0 1rem;
            background: ${colors.offWhite};
            box-shadow: ${shadows.light};

            &::before {
                position: absolute;
                top: 0;
                content: "";
                display: block;
                height: 130%;
                width: 100%;
                margin-top: -3rem;
            }
        }
    }

    li {
        @media(min-width: calc(${sizes.breakpoints.lg} + 1px)) {
            margin: 1rem 0 0;
            padding: 0 1.5rem;
            font-size: 90%;
            width: 100%;
            border-bottom: none;
        }

        @media(max-width: ${sizes.breakpoints.lg}) {
            &:not(:last-child) {
                margin-top: 1rem;
            }
        }
    }

    .shown {
        opacity: 1;

        @media(min-width: calc(${sizes.breakpoints.lg} + 1px)) {
            background: ${colors.white};
            transform: scale(1) translate(-50%, 0);
        }
    }

    .hidden {
        opacity: 0;

        @media(max-width: ${sizes.breakpoints.lg}) {
            display: none;
        }

        @media(min-width: calc(${sizes.breakpoints.lg} + 1px)) {
            transform: scale(0) translate(-50%, -20rem);
        }
    }
`

interface Anchor {
    text: string
    to: string
    target?: boolean
}

interface DropDownProps {
    title: string
    links: Anchor[]
}

class DropDown extends React.Component<DropDownProps, {}> {

    state = {
        isRendered: false
    }

    handleClick = () => {
        this.setState({isRendered: !this.state.isRendered})
    }

    handleMouseEnter = () => {
        this.setState({isRendered: true})
    }

    handleMouseLeave = () => {
        this.setState({isRendered: false})
    }

    render () {
        const { title, links } = this.props
        const { isRendered } = this.state

        return (
            <StyledDropDown
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <button
                    aria-label={ isRendered ? "Hide Dropdown's Content" : "Show Dropdown's Content"}
                    aria-live="assertive"
                    onFocus={this.handleMouseEnter}
                >
                    <div>{title}</div>
                    <img
                        alt="Arrow"
                        className="arrow"
                        src={ArrowDown}
                        style={ isRendered ? {transform: 'rotate(180deg)'}: {} }
                        />
                </button>

                <ul  className={ isRendered ? 'shown' : 'hidden' }>
                    {
                        links.map(({text, to, target}, i) =>
                            target ?
                                (
                                    <li key={i}>
                                        <ExternalLink
                                            href={to}
                                            tabIndex={ isRendered ? 0 : -1 }
                                            text={text}
                                            className="link"
                                            onBlur={i == links.length - 1 && this.handleMouseLeave}
                                        />
                                    </li>
                                )
                                    :
                                (
                                    <li key={i}>
                                        {
                                            i == links.length - 1 ?
                                                <Link
                                                    to={to}
                                                    className="link"
                                                    tabIndex={ isRendered ? 0 : -1 }
                                                    activeClassName="active"
                                                    onBlur={this.handleMouseLeave}
                                                >
                                                    {text}
                                                </Link>
                                            :
                                                <Link
                                                        to={to}
                                                        className="link"
                                                        tabIndex={ isRendered ? 0 : -1 }
                                                        activeClassName="active"
                                                >
                                                        {text}
                                                </Link>
                                        }
                                    </li>
                                )
                        )
                    }
                    <span aria-hidden={true}></span>
                </ul>
            </StyledDropDown>
        )
    }
}

export default DropDown
