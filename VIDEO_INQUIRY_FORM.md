# Video Editing Inquiry Form

A comprehensive, accessible video editing inquiry form built with React and Tailwind CSS that matches the website's dark theme.

## Features

### Form Fields

1. **Full Name** (Required)
   - Single-line text input
   - Validation: Cannot be empty

2. **Email Address** (Required)
   - Single-line text input
   - Validation: Must be valid email format
   - Pattern: `name@domain.com`

3. **Phone Number** (Optional)
   - Single-line text input
   - No validation required

4. **Company / Brand Name** (Optional)
   - Single-line text input
   - No validation required

5. **Location** (Required)
   - Single-line text input
   - Placeholder: "City, State / County (e.g., Windham, ME or London, Greater London)"
   - Accepts all USA states and international locations
   - Validation: Cannot be empty

6. **Project Type** (Required)
   - Dropdown select
   - Options:
     - Wedding
     - Event
     - Short Film
     - Social Media / Marketing Video
     - Other
   - Validation: Must select an option

7. **Project Details / Vision** (Required)
   - Multi-line textarea (5 rows)
   - Placeholder: "Describe your footage, style, preferred edit type, and any inspiration references."
   - Validation: Cannot be empty

8. **Sample Video Link** (Optional)
   - Single-line URL input
   - Placeholder: "Paste your video link (YouTube, Vimeo, Google Drive, etc.)"
   - Validation: Must be valid URL format if provided

9. **Preferred Timeline** (Optional)
   - Dropdown select
   - Options:
     - ASAP
     - 1–2 weeks
     - 3–4 weeks
     - Flexible
   - Default: None selected

10. **Budget** (Optional)
    - Single-line text input
    - Placeholder: "Budget (Optional)"
    - No validation required

11. **Consent Checkbox** (Required)
    - Checkbox input
    - Text: "I agree to share my footage and project details for review. I understand we will provide a custom quote after reviewing my submission."
    - Validation: Must be checked

### Submit Button
- Primary button styled to match website theme
- Text: "Send Inquiry"
- Loading state: "Sending..."
- Disabled during submission

## Functionality

### Validation

The form includes comprehensive client-side validation:

- **Required Fields**: Full Name, Email, Location, Project Type, Project Details, Consent
- **Email Validation**: Regex pattern validation for proper email format
- **URL Validation**: Sample Video Link must be valid URL if provided
- **Consent Validation**: Checkbox must be checked
- **Real-time Error Display**: Errors shown below respective fields
- **Error Clearing**: Errors clear when user starts typing

### Form Submission

```javascript
// POST to /api/inquiry
{
  fullName: string,
  email: string,
  phone: string,
  companyName: string,
  location: string,
  projectType: string,
  projectDetails: string,
  sampleVideoLink: string,
  preferredTimeline: string,
  budget: string,
  consentGiven: boolean
}
```

### Success/Error Messages

**Success Message:**
"Thank you for your inquiry! We will review your project details and provide a custom quote within 24-48 hours."

**Error Message:**
"Sorry, there was an error sending your inquiry. Please try again or contact us directly."

## Responsive Design

The form is fully responsive and works across all devices:

- **Mobile** (< 640px): Single column layout, optimized touch targets
- **Tablet** (640px - 1023px): Enhanced spacing and readability
- **Desktop** (1024px+): Maximum width container for optimal form layout

### Touch Targets
- All interactive elements meet minimum 44px touch target size
- Enhanced for accessibility and mobile usability

## Accessibility

- **ARIA Labels**: All form fields have proper `aria-label` attributes
- **ARIA Required**: Required fields marked with `aria-required="true"`
- **Focus States**: Custom focus ring styling for keyboard navigation
- **Error Announcement**: Error messages associated with form fields
- **Semantic HTML**: Proper use of form elements
- **Keyboard Navigation**: Full keyboard support

## Styling

### Theme Integration
- Matches website's dark theme aesthetic
- Uses existing CSS classes from `index.css`:
  - `.floating-panel-dark` - Container styling
  - `.input-inset` - Form input styling
  - `.btn-pill` - Button styling
  - `.btn-primary` - Primary button colors
  - `.heading-responsive-lg` - Typography
  - `.text-glow` - Text glow effects

### Color Scheme
- Background: Dark with glassmorphism effect
- Text: White with varying opacity
- Accent: `#D3FD50` (neon green)
- Error: Red (`#ff6b6b`)
- Success: Green (`#51cf66`)

## Database Schema

When Supabase is configured, the form will store data in the `video_inquiries` table:

```sql
CREATE TABLE video_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  company_name text DEFAULT '',
  location text NOT NULL,
  project_type text NOT NULL,
  project_details text NOT NULL,
  sample_video_link text DEFAULT '',
  preferred_timeline text DEFAULT 'Flexible',
  budget text DEFAULT '',
  consent_given boolean NOT NULL DEFAULT false,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);
```

## Integration

### Using the Form Component

```jsx
import VideoInquiryForm from './components/forms/VideoInquiryForm'

function YourPage() {
  return (
    <div>
      <VideoInquiryForm />
    </div>
  )
}
```

### Standalone Page

The form is also available as a standalone page at `/video-inquiry`:

```jsx
import VideoInquiry from './pages/VideoInquiry'

// Already configured in App.jsx
<Route path='/video-inquiry' element={<VideoInquiry />} />
```

## API Configuration

To connect the form to your backend:

1. Update the `fetch` URL in `VideoInquiryForm.jsx`:
   ```javascript
   const response = await fetch('/api/inquiry', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(formData)
   })
   ```

2. Configure Supabase when ready:
   - Set up environment variables
   - Uncomment database code in `src/api/inquiryHandler.js`
   - Initialize Supabase client

## File Structure

```
src/
├── components/
│   └── forms/
│       └── VideoInquiryForm.jsx    # Main form component
├── pages/
│   └── VideoInquiry.jsx            # Standalone form page
└── api/
    └── inquiryHandler.js           # API handler functions
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lazy loading ready
- Minimal re-renders with optimized state management
- Efficient validation with debouncing
- Lightweight bundle size

## Future Enhancements

When Supabase database is available:
1. Real-time form submission to database
2. Email notifications on submission
3. Admin dashboard to view inquiries
4. Status tracking system
5. File upload for reference materials
