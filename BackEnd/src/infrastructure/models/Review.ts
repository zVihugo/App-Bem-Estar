import { ReviewProps } from '../../@types/ReviewProps';
import { ReviewDTO } from '../../dtos/review/ReviewDTO';

export class Review {
  constructor(private readonly props: ReviewProps) {}

  public static create(props: ReviewProps) {
    return new Review(props);
  }

  public get id() {
    return this.props.id;
  }

  public get userId() {
    return this.props.userId;
  }

  public get sleepHours() {
    return this.props.sleepHours;
  }

  public get difficultySleepFrequency() {
    return this.props.difficultySleepFrequency;
  }

  public get wakeUpRested() {
    return this.props.wakeUpRested;
  }

  public get daytimeDrowsiness() {
    return this.props.daytimeDrowsiness;
  }

  public get usageScreenBeforeSleep() {
    return this.props.usageScreenBeforeSleep;
  }

  public get hasRoutineSleep() {
    return this.props.hasRoutineSleep;
  }

  public toJSON(): ReviewDTO {
    return {
      id: this.id,
      userId: this.userId,
      sleepHours: this.sleepHours,
      difficultySleepFrequency: this.difficultySleepFrequency,
      wakeUpRested: this.wakeUpRested,
      daytimeDrowsiness: this.daytimeDrowsiness,
      usageScreenBeforeSleep: this.usageScreenBeforeSleep,
      hasRoutineSleep: this.hasRoutineSleep,
    };
  }
}
