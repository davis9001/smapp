// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { tooltip, tooltipWhite } from '/assets/images';
import { smColors } from '/vars';

const isDarkModeOn = localStorage.getItem('dmMode') === 'true';
const icon = isDarkModeOn ? tooltipWhite : tooltip;

const InnerWrapper = styled.div`
  display: none;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  padding: 10px 15px;
  background-color: ${smColors.disabledGray};
  border: 1px solid ${smColors.realBlack};
  z-index: 10;
`;

const InnerIcon = styled.img`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 13px;
  height: 13px;
`;

const Text = styled.div`
  font-size: 10px;
  line-height: 13px;
  text-transform: uppercase;
  color: ${smColors.white};
`;

const OuterIcon = styled.img`
  width: 13px;
  height: 13px;
`;

const Wrapper = styled.div`
  position: relative;
  margin-left: 5px;
  margin-top: 2px;
  &:hover ${InnerWrapper} {
    display: block;
  }
`;

type Props = {
  top: number,
  left: number,
  width: number,
  text: string
};

class Tooltip extends PureComponent<Props> {
  render() {
    const { top, left, width, text } = this.props;
    return (
      <Wrapper>
        <OuterIcon src={icon} />
        <InnerWrapper top={top} left={left} width={width}>
          <InnerIcon src={icon} />
          <Text>{text}</Text>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default Tooltip;
