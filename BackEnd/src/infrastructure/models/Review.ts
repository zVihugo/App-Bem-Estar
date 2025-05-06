import { ReviewProps } from '../../@types/ReviewProps';

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

  public get date() {
    return this.props.date;
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
}
