{{/*
Expand the name of the chart.
*/}}
{{- define "gig3r.host" -}}
"{{ .Values.environment }}.{{ .Values.base_url }}"
{{- end }}

{{- define "gig3r.frontend.app" -}}
"gig3r-front-{{ default "app" .Values.environment }}"
{{- end }}

{{- define "gig3r.backend.app" -}}
"gig3r-api-{{ default "app" .Values.environment }}"
{{- end }}

{{- define "gig3r.frontend.image" -}}
"{{ default "mivalsten/gig3r-frontend" .Values.frontend.image }}:{{ default "mivalsten/gig3r-frontend" .Values.frontend.tag }}"
{{- end }}

