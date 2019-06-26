import styled from 'styled-components'

export const Card = styled.div.attrs(() => ({
}))`
  display: block;
  margin-bottom: 1.5rem;
  border-color: #edf2f9;
  box-shadow: 0 0.75rem 1.5rem rgba(18,38,63,.03);
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #edf2f9;
  border-radius: .5rem;
  flex: 1 1 auto;
  padding: 1.5rem;
`;
