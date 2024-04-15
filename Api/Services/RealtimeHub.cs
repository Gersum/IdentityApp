using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class RealtimeHub : Hub
{
    // Define methods to send real-time updates to clients
    public async Task SendUserCount(int count)
    {
        await Clients.All.SendAsync("ReceiveUserCount", count);
    }
}