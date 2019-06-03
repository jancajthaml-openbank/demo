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

export const HeaderNav = styled.nav.attrs({
})`

  flex: 1 1 100%;
  height: 100%;

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    align-items: center;
    height: 100%;
    text-transform: capitalize;

    li {
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;

      span {
        color: ${$white};
        cursor: default;
        padding: 1em;
        background: rgba(0,0,0,.2)
      }

      a {
        color: ${$callout3};
        padding: 1em;
        text-decoration: none;

        &:hover {
          color: ${$white};
        }
      }
    }
  }
`;

export const HeaderWrapper = styled.div.attrs({
})`
  padding: 0;
  display: flex;
  align-items: center;
  background: ${$callout1};

  > select {
    background: ${$callout1};
    padding: 3px;
    border: 1px solid ${$white};
    margin: 0 1em;
    width: 100px;
    color: ${$white};
    font-size: 14px;
    outline: none;
    cursor: pointer;

    &::-ms-expand {
      display: none;
    }

    &[disabled] {
      color: ${$callout3};
      border-color: ${$callout3};
      cursor: not-allowed;
    }

    option {
      color: ${$white};
      display: flex;
      white-space: pre;
      min-height: 20px;
      padding: 0px 2px 1px;
    }
  }
`;
