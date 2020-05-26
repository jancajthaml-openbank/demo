import styled from 'styled-components'

import { Select } from '../../components/Select'

export const TenantSelect = Select

import {
  $white,
  $black,
  $callout1,
  $callout2,
  $callout3,
} from '../../stylesheets/variables'

export const HeaderNavigation = styled.div.attrs(() => ({
}))`
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

export const HeaderWrapper = styled.nav.attrs(() => ({
}))`
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

export const HeaderLogo = styled.a.attrs(() => ({
}))`
  display: inline-block;
  padding-top: 0;
  padding-bottom: 0;
  margin-right: .5rem;
  line-height: inherit;
  white-space: nowrap;
  width: 2rem;
  height: 2rem;
  background-position: center;
  background-size: contain;
  background-image: url('https://avatars3.githubusercontent.com/u/33759883');
`;
