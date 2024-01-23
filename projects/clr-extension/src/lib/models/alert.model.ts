/**
 * Represents the type of alert, which can be 'success', 'info', 'warning', or 'danger'.
 */
export type AlertType = 'success' | 'info' | 'warning' | 'danger';

/**
 * Represents an alert that can be displayed in the application.
 * @class
 */
export class Alert {
  /**
   * Creates an instance of the Alert class.
   * @constructor
   * @param {string} content - The content or message of the alert.
   * @param {Object} [options] - An optional configuration object for additional options.
   * @param {AlertType} [options.alertType='danger'] - The type of the alert. Defaults to 'danger'.
   * @param {boolean} [options.isAppLevel=true] - Indicates whether the alert is at the application level. Defaults to true.
   * @param {() => void} [options.onTargetClick] - A onTargetClick function to be executed when the a target inside the alert is clicked.
   * @param {string} [options.targetId] - The ID of the target element inside the alert, such as button or a link.
   */
  constructor(
    public content: string,
    {
      alertType = 'danger',
      isAppLevel = true,
      onTargetClick,
      targetId,
    }: {
      alertType?: AlertType;
      isAppLevel?: boolean;
      onTargetClick?: () => void;
      targetId?: string;
    } = {},
  ) {
    /**
     * A unique symbol representing the identifier of the alert instance.
     * @member {symbol}
     * @readonly
     */
    this.id = Symbol();

    /**
     * The type of the alert, which can be 'success', 'info', 'warning', or 'danger'.
     * @member {AlertType}
     */
    this.alertType = alertType;

    /**
     * Indicates whether the alert is at the application level.
     * @member {boolean}
     */
    this.isAppLevel = isAppLevel;

    /**
     * The ID of the clickable target element such as a button or a link.
     * @member {string | undefined}
     */
    this.targetId = targetId;

    /**
     * A onTargetClick function to be executed when the target is clicked.
     * @member {(() => void) | undefined}
     */
    this.onTargetClick = onTargetClick;
  }

  /**
   * A unique symbol representing the identifier of the alert instance.
   * @member {symbol}
   * @readonly
   */
  readonly id: symbol;

  /**
   * The type of the alert, which can be 'success', 'info', 'warning', or 'danger'.
   * @member {AlertType}
   */
  alertType: AlertType;

  /**
   * Indicates whether the alert is at the application level.
   * @member {boolean}
   */
  isAppLevel: boolean;

  /**
   * The ID of the clickable target element such as a button or a link.
   * @member {string | undefined}
   */
  targetId?: string;

  /**
   * A onTargetClick function to be executed when the target is clicked.
   * @member {(() => void) | undefined}
   */
  onTargetClick?: () => void;
}
