'use client';

import { useState } from 'react';
import Header from '@/app/(components)/Header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { setIsDarkMode } from '@/state/index';
import { useAppDispatch, useAppSelector } from '../redux';

type UserSetting = {
  label: string;
  value: string | boolean;
  type: 'text' | 'toggle';
};

const defaultSettings: UserSetting[] = [
  { label: 'Name', value: 'Taylor Beck', type: 'text' },
  { label: 'Email', value: 'taylor.beck@email.com', type: 'text' },
  { label: 'Language', value: 'English', type: 'text' },
  { label: 'Notifications', value: true, type: 'toggle' },
  { label: 'Dark Mode', value: false, type: 'toggle' },
];

const UserSettings = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(state => state.global.isDarkMode);
  defaultSettings[4].value = isDarkMode;

  const [userSettings, setUserSettings] =
    useState<UserSetting[]>(defaultSettings);

  const handleToggleChange = (index: number) => {
    setUserSettings(prevSettings =>
      prevSettings.map((setting, i) =>
        i === index ? { ...setting, value: !setting.value } : setting
      )
    );

    if (index === 4) {
      dispatch(setIsDarkMode(!isDarkMode));
    }
  };

  const handleTextChange = (index: number, value: string) => {
    setUserSettings(prevSettings =>
      prevSettings.map((setting, i) =>
        i === index ? { ...setting, value } : setting
      )
    );
  };

  return (
    <div className="w-full">
      <Header name="User Settings" />
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Setting</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userSettings.map((setting, index) => (
              <TableRow key={setting.label}>
                <TableCell>{setting.label}</TableCell>
                <TableCell>
                  {setting.type === 'toggle' ? (
                    <Switch
                      checked={setting.value as boolean}
                      onCheckedChange={() => handleToggleChange(index)}
                    />
                  ) : (
                    <Input
                      className={`text-base ${isDarkMode ? '!text-white' : ''}`}
                      type="text"
                      value={setting.value as string}
                      onChange={event =>
                        handleTextChange(index, event.target.value)
                      }
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserSettings;
