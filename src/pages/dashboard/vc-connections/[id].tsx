import React, { useEffect } from "react";
import { navigate, Link } from "gatsby";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Tag from "@/components/parts/Tag";
import type { VCInvestorWithContacts } from "@/services/vc-investors-api";
import {
  ExternalLink,
  Globe,
  MapPin,
  DollarSign,
  Mail,
  Linkedin,
  User,
  MapPinned,
  ArrowLeft,
} from "lucide-react";

interface Props {
  id?: string;
}

export default function InvestorShowPage({ id }: Props) {
  const { isLoading: authLoading, isAuthenticated, checkSession } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    checkSession().then((u) => {
      if (!u) navigate("/login");
    });
  }, [checkSession]);

  const investors = queryClient.getQueryData<VCInvestorWithContacts[]>(["vc-investors"]);
  const investor = investors?.find((inv) => inv.id === id);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-srv-dark">
        <p className="text-srv-gray">Loading...</p>
      </div>
    );
  }

  if (!investor) {
    return (
      <DashboardLayout activeItem="VC Connections">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-srv-gray mb-4">Investor not found.</p>
          <Link to="/dashboard/vc-connections" className="text-srv-teal hover:text-srv-teal/80 text-sm">
            Back to VC Connections
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const displayUrl = investor.domain || (investor.website ? investor.website.replace(/^https?:\/\//, '').replace(/\/$/, '') : '');

  return (
    <DashboardLayout activeItem="VC Connections">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back link */}
        <Link
          to="/dashboard/vc-connections"
          className="inline-flex items-center gap-1.5 text-srv-gray hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to VC Connections
        </Link>

        {/* Header */}
        <div className="border-2 border-white/20 rounded-lg bg-black/30 backdrop-blur-sm overflow-hidden">
          <div className="p-8 border-b border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">{investor.name}</h1>
                {investor.website && (
                  <a
                    href={investor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-srv-teal text-sm hover:text-srv-teal/80 transition-colors"
                  >
                    <ExternalLink size={14} />
                    {displayUrl}
                  </a>
                )}
              </div>
              {investor.type && (
                <Tag className="bg-srv-pink/20 text-srv-pink border border-srv-pink/40 text-sm px-3 py-1">
                  {investor.type}
                </Tag>
              )}
            </div>

            {investor.notes && (
              <p className="text-white/70 text-sm leading-relaxed">{investor.notes}</p>
            )}
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {/* Stages */}
            {investor.stage.length > 0 && (
              <div className="p-6 bg-black/20">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Investment Stage</h3>
                <div className="flex flex-wrap gap-2">
                  {investor.stage.map((s, i) => (
                    <Tag key={i} className="border border-srv-teal/40 text-srv-teal bg-srv-teal/10 text-sm px-3 py-1">{s}</Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Industries */}
            {investor.industryTags.length > 0 && (
              <div className="p-6 bg-black/20">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {investor.industryTags.map((tag, i) => (
                    <Tag key={i} className="border border-srv-yellow/40 text-srv-yellow bg-srv-yellow/10 text-sm px-3 py-1">{tag}</Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Cheque size */}
            {investor.chequeSize.length > 0 && (
              <div className="p-6 bg-black/20">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Cheque Size</h3>
                <div className="flex items-center gap-2 text-white text-sm">
                  <DollarSign size={14} className="text-white/40" />
                  {investor.chequeSize.join(', ')}
                </div>
              </div>
            )}

            {/* Geography */}
            {investor.targetGeography.length > 0 && (
              <div className="p-6 bg-black/20">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Target Geography</h3>
                <div className="flex items-center gap-2 text-white text-sm">
                  <MapPin size={14} className="text-white/40" />
                  {investor.targetGeography.join(', ')}
                </div>
              </div>
            )}

            {/* HQ Country */}
            {investor.companyCountry.length > 0 && (
              <div className="p-6 bg-black/20">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Headquartered In</h3>
                <div className="flex items-center gap-2 text-white text-sm">
                  <Globe size={14} className="text-white/40" />
                  {investor.companyCountry.join(', ')}
                </div>
              </div>
            )}
          </div>

          {/* Contacts */}
          {investor.contacts && investor.contacts.length > 0 && (
            <div className="p-8 border-t border-white/10">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Contacts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {investor.contacts.map((name, i) => (
                  <div key={i} className="border border-white/10 rounded-lg p-4 bg-black/20">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-srv-teal/20 flex items-center justify-center">
                        <User size={14} className="text-srv-teal" />
                      </div>
                      <span className="text-white font-medium text-sm">{name}</span>
                    </div>

                    <div className="space-y-2 ml-10">
                      {investor.contactLocation?.[i] && (
                        <div className="flex items-center gap-2 text-white/50 text-xs">
                          <MapPinned size={12} className="shrink-0" />
                          <span>{investor.contactLocation[i]}</span>
                        </div>
                      )}
                      {investor.contactEmail?.[i] && (
                        <a
                          href={`mailto:${investor.contactEmail[i]}`}
                          className="flex items-center gap-2 text-srv-teal text-xs hover:text-srv-teal/80 transition-colors"
                        >
                          <Mail size={12} className="shrink-0" />
                          <span>{investor.contactEmail[i]}</span>
                        </a>
                      )}
                      {investor.contactLinkedIn?.[i] && (
                        <a
                          href={investor.contactLinkedIn[i]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-srv-teal text-xs hover:text-srv-teal/80 transition-colors"
                        >
                          <Linkedin size={12} className="shrink-0" />
                          <span>View LinkedIn Profile</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
