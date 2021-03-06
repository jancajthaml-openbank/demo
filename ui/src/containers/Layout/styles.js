import styled from 'styled-components'

import {
  $white,
  $black,
  $callout1,
  $callout2,
  $callout3,
} from '../../stylesheets/variables'


export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
`

export const HeaderNavigation = styled.div`
  display: flex;
  flex-basis: auto;
  flex-grow: inherit;
  flex-wrap: nowrap;
  margin-left: -1rem;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;
  order: -1;

  > ul {
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-top: 0;
    padding-inline-start: 40px;
    display: flex;
    flex-direction: row;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;

    li {
      display: list-item;
      text-transform: capitalize;
      font-size: 15px;

      span {
        display: block;
        white-space: nowrap;
        text-decoration: none;
        color: #12263f;
        padding: .625rem .5rem;
        cursor: default;
      }

      a {
        display: block;
        white-space: nowrap;
        text-decoration: none;
        padding: .625rem .5rem;
        color: #6e84a3;

        &:hover {
          color: #12263f;
        }
      }
    }

  }
`;

export const HeaderWrapper = styled.nav`
  background-color: #fff;
  border-color: #e3ebf6;
  border-width: 0 0 1px;
  border-style: solid;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  position: relative;
  padding: .75rem 1rem;
  box-sizing: border-box;
`;

export const HeaderLogo = styled.span`
  display: inline-block;
  margin-right: .5rem;
  height: 1.5rem;

  > svg {
    width: auto;
    height: 100%;
  }
`;
