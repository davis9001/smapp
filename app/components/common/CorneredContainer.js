import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { CorneredWrapper } from '/basicComponents';
import { smColors } from '/vars';

const isDarkModeOn = localStorage.getItem('dmMode') === 'true';
const backgroundColor = isDarkModeOn ? smColors.dmBlack2 : smColors.lightGray;
const color1 = isDarkModeOn ? smColors.white : smColors.realBlack;
const color2 = isDarkModeOn ? smColors.white : smColors.black;

const Wrapper = styled(CorneredWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  padding: 20px;
  background-color: ${backgroundColor};
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderIcon = styled.img`
  width: 35px;
  height: 27px;
  margin-right: 5px;
`;

const Header = styled.div`
  font-size: 32px;
  line-height: 40px;
  color: ${color1};
`;

const SubHeader = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 20px;
  color: ${color2};
`;

type Props = {
  children: any,
  width: number,
  height: number,
  header: string,
  headerIcon?: Object,
  subHeader?: string
};

class CorneredContainer extends PureComponent<Props> {
  render() {
    const { children, width, height, header, headerIcon, subHeader } = this.props;
    return (
      <Wrapper width={width} height={height}>
        <HeaderWrapper>
          {headerIcon && <HeaderIcon src={headerIcon} />}
          <Header>{header}</Header>
        </HeaderWrapper>
        {subHeader && (
          <SubHeader>
            --
            <br />
            {subHeader}
          </SubHeader>
        )}
        {children}
      </Wrapper>
    );
  }
}

export default CorneredContainer;
