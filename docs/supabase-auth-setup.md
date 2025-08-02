# Supabase Authentication Setup Guide

## Overview

This guide walks through configuring Supabase Auth for PsychEval AI.

## 1. Email Authentication

Email authentication is enabled by default in Supabase. To configure:

1. Go to your Supabase dashboard
2. Navigate to Authentication > Settings
3. Under Email Auth:
   - Enable "Email sign-ups"
   - Configure email templates if needed
   - Set redirect URLs to `http://localhost:3000` for development

## 2. Configure Redirect URLs

Add the following URLs to the "Site URL" and "Redirect URLs" in Authentication > URL Configuration:

- Development: `http://localhost:3000`
- Production: Add your production URL when deployed

## 3. Email Templates (Optional)

You can customize the email templates in Authentication > Email Templates:

- **Confirm signup**: Welcome message for new users
- **Reset password**: Password reset instructions
- **Magic Link**: For passwordless login

## 4. JWT Settings

The default JWT settings should work fine, but you can review them in Authentication > Settings > JWT Settings.

## 5. User Management

Users will automatically have a profile created via the database trigger when they sign up.

## Next Steps

1. Run the database migration to set up tables and triggers
2. Test the authentication flow in your local development environment
3. Configure production URLs when ready to deploy