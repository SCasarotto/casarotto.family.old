import { format, isToday, isYesterday } from 'date-fns';

import {
  DaySeparatorContainer,
  DaySeparatorLine,
  DaySeparatorTextWrapper,
  DaySeparatorText,
} from './styledComponents';

type Props = { timestamp: number };
export const ChatroomDaySeparator = (props: Props) => {
  const { timestamp } = props;
  return (
    <DaySeparatorContainer>
      <DaySeparatorLine />
      <DaySeparatorTextWrapper>
        <DaySeparatorText>
          {isToday(timestamp)
            ? 'Today'
            : isYesterday(timestamp)
            ? 'Yesterday'
            : format(timestamp, 'iiii, LLLL do')}
        </DaySeparatorText>
      </DaySeparatorTextWrapper>
    </DaySeparatorContainer>
  );
};
