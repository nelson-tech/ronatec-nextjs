import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"

const LoadingContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const LoaderKeyframes = keyframes`
  to { transform: rotate(360deg); }
`

const LoaderDiv = styled.div`
  height: 100%;
  width: 20%;
  border-top-color: ${props => props.color};
  border-radius: 50%;
  -webkit-animation: ${LoaderKeyframes} 1.5s linear infinite;
  animation: ${LoaderKeyframes} 1.5s linear infinite;
`

type Props = {
  color?: string
}

const LoadingDots: React.FC<Props> = ({ color = "#32de8a" }) => {
  return (
    <div className="relative h-24 mx-auto">
      <LoadingContainer className="">
        <LoaderDiv
          color={color}
          className="ease-linear border-4 border-gray-200"
        ></LoaderDiv>
      </LoadingContainer>
    </div>
  )
}

export default LoadingDots
