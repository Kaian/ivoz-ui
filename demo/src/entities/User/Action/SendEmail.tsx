import EmailIcon from '@mui/icons-material/Email';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import _ from '@irontec/ivoz-ui/services/translations/translate';
import {
  ActionFunctionComponent,
  CustomActionProps,
  isSingleRowAction,
  isMultiSelectAction,
} from '@irontec/ivoz-ui/router/routeMapParser';
import { useStoreActions } from 'store';
import User from '../User';
import { UserPropertiesList, UserPropertyList } from '../UserProperties';

interface SendEmailProps {
  style: Record<string, string | number>;
  error: boolean;
  children: JSX.Element;
  targetId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SendEmail = (props: SendEmailProps) => {
  const { style, error, children, targetId } = props;
  const { open, setOpen } = props;

  const apiPost = useStoreActions((actions) => {
    return actions.api.post;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    apiPost({
      path: User.path + `/${targetId}/notify_credentials`,
      values: {},
      contentType: 'text/plain',
    }).then(() => {
      setOpen(false);
    });
  };

  return (
    <>
      <span style={style} onClick={handleClickOpen}>
        <Tooltip
          title={_('Send email')}
          placement='bottom-start'
          enterTouchDelay={0}
        >
          <EmailIcon />
        </Tooltip>
      </span>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {'Send user credentials notification email?'}
          </DialogTitle>
          <DialogContent>
            {error && (
              <DialogContentText id='alert-dialog-description'>
                Selected user(s) must be enabled and contain an email address
              </DialogContentText>
            )}
            {!error && children}
          </DialogContent>
          <DialogActions>
            {error && <Button onClick={handleClose}>Close</Button>}
            {!error && (
              <>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSend} autoFocus>
                  Accept
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

const SendEmailWrapper: ActionFunctionComponent = (
  props: CustomActionProps
) => {
  const [open, setOpen] = useState(false);

  if (isSingleRowAction(props)) {
    const { row } = props;

    if (row.enabled === 'no') {
      return null;
    }

    if (!row.email) {
      return null;
    }

    const targetId = row.id;
    const error = !targetId;

    return (
      <SendEmail
        style={{}}
        error={error}
        targetId={targetId}
        open={open}
        setOpen={setOpen}
      >
        <DialogContentText id='alert-dialog-description'>
          You&apos;re about to send an email with credentials to user &nbsp;
          <strong>{row.iden}</strong>
        </DialogContentText>
      </SendEmail>
    );
  } else if (isMultiSelectAction(props)) {
    const { rows, selectedValues, style } = props;

    const selectedUsers = selectedValues.map((id: string) => {
      return (rows as UserPropertiesList).find(
        (row) => row.id?.toString() === id
      );
    }) as Array<undefined | UserPropertyList<string>>;

    const validSelectedUsers = selectedUsers.filter(
      (user) => user && user.enabled && user.email
    );

    const skipped = selectedUsers.length - validSelectedUsers.length;

    const targetId = (validSelectedUsers as Array<UserPropertyList<string>>)
      .map((user) => user?.id)
      .join(';');
    const error = validSelectedUsers.length == 0;

    return (
      <SendEmail
        style={style}
        error={error}
        targetId={targetId}
        open={open}
        setOpen={setOpen}
      >
        <DialogContentText id='alert-dialog-description'>
          You&apos;re about to send an email with credentials to: <br />
          <span
            style={{
              display: 'block',
              marginTop: '10px',
              maxHeight: '80px',
              overflowY: 'auto',
            }}
          >
            {validSelectedUsers.map((user, idx) => {
              return (
                <span key={idx}>
                  <strong>{user?.iden}</strong>
                  <br />
                </span>
              );
            })}
          </span>
          {skipped > 0 && (
            <span style={{ display: 'block', marginTop: '10px' }}>
              <strong>{skipped} skipped user(s)</strong> (not enabled or no
              email address).
            </span>
          )}
        </DialogContentText>
      </SendEmail>
    );
  }

  return null;
};

export default SendEmailWrapper;
