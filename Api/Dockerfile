FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8044
EXPOSE 8041

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY . "Api/"
WORKDIR RUN dotnet restore "Api/Api.csproj"

COPY . .
WORKDIR /src/Api
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish  -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Create the Resources/images folder
RUN mkdir -p Resources/images


EXPOSE 8044
EXPOSE 8041

ENTRYPOINT ["dotnet", "Api.dll"]