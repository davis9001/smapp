// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { smColors } from '/vars';
import { CorneredWrapper } from '/basicComponents';

const isDarkModeOn = localStorage.getItem('dmMode') === 'true';

const Wrapper = styled(CorneredWrapper)`
  display: none;
  position: absolute;
  z-index: 10;
`;

const Text = styled.div`
  font-size: 10px;
  line-height: 13px;
  text-transform: uppercase;
  color: ${isDarkModeOn ? smColors.white : smColors.realBlack};
  text-align: center;
`;

type Props = {
  text: string,
  className?: string
};

class NavTooltip extends PureComponent<Props> {
  render() {
    const { text, className } = this.props;
    return (
      <Wrapper className={className}>
        <Text>{text}</Text>
      </Wrapper>
    );
  }
}

export default NavTooltip;
