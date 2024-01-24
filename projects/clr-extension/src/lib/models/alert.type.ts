/**
 * Represents the type of alert, which can be 'success', 'info', 'warning', or 'danger'.
 */
export type AlertType = 'success' | 'info' | 'warning' | 'danger';

/**
 * Represents an alert that developers can configure when calling alertsService.addAlert()
 */
export type Alert = {
  /**
   * The content or message of the alert.
   */
  content: string;

  /**
   * A unique symbol representing the identifier of the alert instance.
   */
  readonly id?: symbol;

  /**
   * The type of alert, which can be 'success', 'info', 'warning', or 'danger'.
   */
  alertType?: AlertType;
  /**
   * Indicates whether the alert is at the application level.
   */
  isAppLevel?: boolean;

  /**
   * The class or ID of the clickable target element such as a button or a link.
   */
  targetSelector?: string;

  /**
   * A onTargetClick function to be executed when the target is clicked.
   */
  onTargetClick?: () => void;
};

/**
 * Represents required properties for displaying an alert in the application.
 */
export type RequiredAlert = Required<Pick<Alert, 'content' | 'alertType' | 'isAppLevel' | 'id'>> & Alert;
