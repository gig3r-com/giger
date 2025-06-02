{{- define "gig3r.host" -}}
  {{ .Values.environment }}.{{ .Values.base_url }}
{{- end }}

########## FRONTEND ##########

{{- define "gig3r.frontend.app" -}}
  gig3r-{{ default "app" .Values.environment }}-front
{{- end }}

{{- define "gig3r.frontend.image" -}}
{{ default "mivalsten/gig3r-frontend" .Values.frontend.image }}:{{ default "dev" .Values.frontend.tag }}
{{- end }}

########## BACKEND ##########

{{- define "gig3r.backend.image" -}}
  {{ default "mivalsten/gig3r-backend" .Values.backend.image }}:{{ default "dev" .Values.backend.tag }}
{{- end }}

{{- define "gig3r.backend.app" -}}
  gig3r-{{ default "app" .Values.environment }}-api
{{- end }}

{{- define "gig3r.backend.debug" -}}
  {{- if eq "app" .Release.Namespace -}}
    true
  {{- else -}}
    false
  {{- end -}}
{{- end }}

#if .Values.environment != app then Development, else Production 
{{- define "gig3r.backend.environment" -}}
  {{- if eq "app" .Values.environment -}}
    "Production"
  {{- else -}}
    "Development"
  {{- end -}}
{{- end -}}

########## MONGODB ##########

{{- define "gig3r.mongodb.app" -}}
  gig3r-{{ default "app" .Values.environment }}-mongodb
{{- end }}

{{- define "gig3r.mongodb.image" -}}
  {{ default "mivalsten/gig3r-mongo" .Values.database.image }}:{{ default "latest" .Values.database.tag }}
{{- end }}

{{- define "gig3r.mongodb.password" -}}
  {{- $len := 24 | int -}}
  {{- $obj := (lookup "v1" "Secret" .Namespace "gig3r-secret").data -}}
  {{- if $obj }}
    {{- index $obj "MONGO_INITDB_ROOT_PASSWORD" | b64dec -}}
  {{- else -}}
    {{- randAlphaNum $len | b64enc -}}
  {{- end -}}
{{- end }}

{{- define "gig3r.mongodb.mountPath" -}}
  {{- if (eq "app" .Values.environment) -}}
    /opt/mongo/app
  {{- else -}}
    /opt/mongo/db-{{ .Values.environment }}
  {{- end -}}
{{- end -}}

{{- define "gig3r.mongodb.pv" -}}
  gig3r-{{ .Values.environment }}-mongo-pv
{{- end -}}

{{- define "gig3r.mongodb.storage.size" -}}
  500Mi
{{- end -}}

########## MONGO_EXPRESS ##########

{{- define "gig3r.mongo-express.app" -}}
  gig3r-{{ default "app" .Values.environment }}-mongo-express
{{- end }}