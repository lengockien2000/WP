import { toast, Icon } from '@ahaui/react';

const error = (message, title = 'Notification') => {
  toast.error(
    () => (
      <div className="u-flex u-flexGrow1">
        <div className="u-marginRightExtraSmall">
          <Icon name="alert" size="medium" />
        </div>
        <div className="u-flexGrow1">
          <div className="u-fontMedium u-marginBottomExtraSmall">{title}</div>
          <div>{message}</div>
        </div>
      </div>
    ),
    {},
  );
};

const success = (message, title = 'Notification') =>
  toast.success(
    () => (
      <div className="u-flex u-flexGrow1">
        <div className="u-marginRightExtraSmall">
          <Icon name="informationCircle" size="medium" />
        </div>
        <div className="u-flexGrow1">
          <div className="u-fontMedium u-marginBottomExtraSmall">{title}</div>
          <div>{message}</div>
        </div>
      </div>
    ),
    {},
  );

export { success, error };
