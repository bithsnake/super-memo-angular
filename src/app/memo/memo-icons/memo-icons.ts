/**List of memo icons that can be used. */
export const MemoIcons = {
    edit : {name : "Edit" , icon : '✏️' as MemoIcon},
    remove : {name : "Remove" , icon : '❌' as MemoIcon},
    memo : {name : "Memo" , icon : '📝' as MemoIcon},
    importantmemo : {name : "Important Memo" , icon : '📝❗' as MemoIcon},
    reminder: { name: "Reminder", icon: '⏰' as MemoIcon},
    label: { name: "Label", icon: '🏷️' as MemoIcon},
    sendmail: { name: "Send Mail", icon: '📧' as MemoIcon},
    schedule: { name: "Schedule", icon: '📅' as MemoIcon},
}
/**Edit icon */
export type Edit = '✏️';
/**Remove icon */
export type Remove = '❌';
/**Normal memo icon */
export type _Memo = '📝';
/**Important memo icon */
export type ImportantMemo = '📝❗';
/**Reminder icon */
export type Reminder = '⏰';
/**Label icon */
export type Label = '🏷️';
/**Send email remainder icon */
export type SendMail = '📧';
/**Schedule icon */
export type Schedule = '📅';

export type MemoIcon = Edit | Remove | _Memo | ImportantMemo | Reminder | Label | SendMail | Schedule;
