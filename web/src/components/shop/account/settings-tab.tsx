import ProfileForm from "./profile-form";
import AddressForm from "./address-form";
import PasswordForm from "./password-form";

interface Props {
  user: any;
}

export default function SettingsTab({ user }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid xl:grid-cols-2 gap-6">
        <ProfileForm user={user} />

        <AddressForm user={user} />
      </div>

      <PasswordForm />
    </div>
  );
}
