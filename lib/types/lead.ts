export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  status: "PENDING" | "REACHED_OUT";
  personal_url?: string;
  visa_type?: string[];
  resume_url?: string;
  additional_info?: string;
  country: string;
}

